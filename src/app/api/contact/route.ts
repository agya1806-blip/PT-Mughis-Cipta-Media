import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

async function sendEmailNotification(name: string, email: string, phone: string | null, message: string) {
  const resendKey = process.env.RESEND_API_KEY
  const adminEmail = process.env.ADMIN_EMAIL || "admin@pt-mughis-cipta-media.com"
  if (!resendKey) return

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Maktabah al-Mughis <noreply@mughisciptamedia.com>",
        to: adminEmail,
        subject: `Pesan Baru dari ${name} - Form Kontak Maktabah al-Mughis`,
        html: `
          <h2>Pesan Baru dari Form Kontak</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;font-weight:bold">Nama</td><td style="padding:8px">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
            ${phone ? `<tr><td style="padding:8px;font-weight:bold">Telepon</td><td style="padding:8px">${phone}</td></tr>` : ""}
          </table>
          <hr />
          <p style="white-space:pre-wrap">${message}</p>
        `,
      }),
    })
  } catch {
    // Email gagal — tidak kritikal, form tetap terkirim
  }
}

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

    sendEmailNotification(name, email, phone || null, message)

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan. Silakan coba lagi." }, { status: 500 })
  }
}
