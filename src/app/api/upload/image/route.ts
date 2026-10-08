import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { uploadFile } from "@/lib/upload"

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

    const isImage = file.type.startsWith("image/")
    const isVideo = file.type.startsWith("video/")

    if (!isImage && !isVideo) {
      return NextResponse.json({ error: "Hanya file gambar (JPG, PNG, WebP) atau video (MP4, WebM)" }, { status: 400 })
    }

    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: "File maksimal 25MB" }, { status: 400 })
    }

    const subDir = isVideo ? "videos" : "covers"
    const url = await uploadFile(file, subDir)
    return NextResponse.json({ url })
  } catch (e) {
    console.error("Upload image error:", e)
    return NextResponse.json({ error: "Gagal mengunggah gambar" }, { status: 500 })
  }
}