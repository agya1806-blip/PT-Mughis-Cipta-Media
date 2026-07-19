import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Nama, email, dan pesan wajib diisi" }, { status: 400 })
    }

    const submission = await prisma.contactSubmission.create({
      data: { name, email, phone: phone || null, message },
    })

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan. Silakan coba lagi." }, { status: 500 })
  }
}
