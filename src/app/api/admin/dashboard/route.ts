import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const [totalBooks, activeResellers, unreadMessages] = await Promise.all([
      prisma.book.count(),
      prisma.user.count({ where: { role: "RESELLER", approvalStatus: "approved" } }),
      prisma.contactSubmission.count({ where: { isRead: false } }),
    ])

    return NextResponse.json({ totalBooks, activeResellers, unreadMessages })
  } catch {
    return NextResponse.json({ error: "Gagal memuat dashboard" }, { status: 500 })
  }
}
