import { NextResponse } from "next/server"
import { uploadFile } from "@/lib/upload"
import { getCurrentUser } from "@/lib/auth"
import { getCurrentTeamMember } from "@/lib/team/auth"

export async function POST(request: Request) {
  try {
    const [user, member] = await Promise.all([
      getCurrentUser().catch(() => null),
      getCurrentTeamMember().catch(() => null),
    ])
    if (!user && !member) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

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

    const url = await uploadFile(file, "team")
    return NextResponse.json({ url })
  } catch (error) {
    console.error("Team photo upload error:", error)
    return NextResponse.json({ error: "Gagal mengunggah foto" }, { status: 500 })
  }
}
