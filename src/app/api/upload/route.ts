import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { getCurrentUser } from "@/lib/auth"

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    if (!file) {
      return NextResponse.json({ error: "Tidak ada file" }, { status: 400 })
    }

    const ext = file.name.split(".").pop()?.toLowerCase()
    const allowed = ["pdf", "doc", "docx"]
    if (!ext || !allowed.includes(ext)) {
      return NextResponse.json({ error: "Hanya file PDF, DOC, atau DOCX" }, { status: 400 })
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: "File maksimal 20MB" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    const filePath = path.join(uploadDir, safeName)

    await mkdir(uploadDir, { recursive: true })
    await writeFile(filePath, buffer)

    const url = `/uploads/${safeName}`
    return NextResponse.json({ url, name: file.name })
  } catch {
    return NextResponse.json({ error: "Gagal mengunggah file" }, { status: 500 })
  }
}
