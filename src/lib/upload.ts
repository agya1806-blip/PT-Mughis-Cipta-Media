import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { put } from "@vercel/blob"

function isVercel() {
  return !!process.env.BLOB_READ_WRITE_TOKEN
}

export async function uploadFile(
  file: File,
  subDir: string
): Promise<string> {
  const ext = file.name.split(".").pop() || file.type.split("/")[1] || "jpg"
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`

  if (isVercel()) {
    const blob = await put(`uploads/${subDir}/${safeName}`, file, {
      access: "public",
    })
    return blob.url
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", subDir)
  await mkdir(uploadDir, { recursive: true })
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(path.join(uploadDir, safeName), buffer)
  return `/uploads/${subDir}/${safeName}`
}
