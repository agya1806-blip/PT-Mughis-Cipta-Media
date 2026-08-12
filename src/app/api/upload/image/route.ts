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

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Hanya file gambar (JPG, PNG, WebP)" }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File maksimal 5MB" }, { status: 400 })
    }

    const url = await uploadFile(file, "covers")
    return NextResponse.json({ url })
  } catch (e) {
    console.error("Upload image error:", e)
    return NextResponse.json({ error: "Gagal mengunggah gambar" }, { status: 500 })
  }
}