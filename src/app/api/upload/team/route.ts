import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    if (!file) {
      return NextResponse.json({ error: "Tidak ada file" }, { status: 400 })
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Hanya file gambar" }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File maksimal 10MB" }, { status: 400 })
    }

    const ext = file.type.split("/")[1] || "jpg"
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const uploadDir = path.join(process.cwd(), "public", "uploads", "team")
    const filePath = path.join(uploadDir, safeName)

    await mkdir(uploadDir, { recursive: true })
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, buffer)

    const url = `/uploads/team/${safeName}`
    return NextResponse.json({ url })
  } catch (error) {
    console.error("Team photo upload error:", error)
    return NextResponse.json({ error: "Gagal mengunggah foto" }, { status: 500 })
  }
}
