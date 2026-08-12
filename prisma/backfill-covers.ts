import "dotenv/config"
import { config as loadLocalEnv } from "dotenv"
import { readFile } from "fs/promises"
import path from "path"
import { prisma } from "../src/lib/prisma"
import { uploadFile } from "../src/lib/upload"

function decodeDataUrl(dataUrl: string): { buffer: Buffer; mime: string; ext: string } | null {
  const match = /^data:(image\/(?:jpeg|png|webp));base64,(.+)$/.exec(dataUrl)
  if (!match) return null
  const mime = match[1]
  const ext = mime === "image/jpeg" ? "jpg" : mime === "image/png" ? "png" : "webp"
  return { buffer: Buffer.from(match[2], "base64"), mime, ext }
}

async function migrateImage(current: string, bookId: number, field: "coverImage" | "backCoverImage"): Promise<string | null> {
  if (!current || !current.startsWith("data:")) {
    if (current && current.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", current)
      try {
        const buffer = await readFile(filePath)
        const file = new File([new Uint8Array(buffer)], `cover.${current.split(".").pop() || "jpg"}`, {
          type: `image/${current.split(".").pop() === "png" ? "png" : current.split(".").pop() === "webp" ? "webp" : "jpeg"}`,
        })
        const url = await uploadFile(file, "covers")
        return url
      } catch {
        console.warn(`  [skip] ${field} buku ${bookId}: file lokal tidak ditemukan (${current})`)
        return null
      }
    }
    return current
  }
  const decoded = decodeDataUrl(current)
  if (!decoded) {
    console.warn(`  [skip] ${field} buku ${bookId}: format data URL tidak didukung`)
    return null
  }
  const file = new File([new Uint8Array(decoded.buffer)], `cover.${decoded.ext}`, { type: decoded.mime })
  const url = await uploadFile(file, "covers")
  return url
}

async function main() {
  loadLocalEnv({ path: ".env.local", override: true })
  const books = await prisma.book.findMany({
    where: {
      OR: [{ coverImage: { startsWith: "data:" } }, { coverImage: { startsWith: "/uploads/" } }, { backCoverImage: { startsWith: "data:" } }, { backCoverImage: { startsWith: "/uploads/" } }],
    },
    select: { id: true, title: true, coverImage: true, backCoverImage: true },
  })

  console.log(`Ditemukan ${books.length} buku dengan cover base64.`)

  let migrated = 0
  let skipped = 0

  for (const book of books) {
    const updates: Record<string, string | null> = {}
    const front = await migrateImage(book.coverImage || "", book.id, "coverImage")
    const back = await migrateImage(book.backCoverImage || "", book.id, "backCoverImage")
    if (front !== null) updates.coverImage = front || null
    if (back !== null) updates.backCoverImage = back || null
    if (Object.keys(updates).length === 0) { skipped++; continue }
    await prisma.book.update({ where: { id: book.id }, data: updates })
    migrated++
    console.log(`  [ok] #${book.id} "${book.title}" → depan: ${(updates.coverImage || "").slice(0, 60)} | belakang: ${(updates.backCoverImage || "").slice(0, 60)}`)
  }

  console.log(`Selesai: ${migrated} buku dimigrasi, ${skipped} dilewati.`)
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})