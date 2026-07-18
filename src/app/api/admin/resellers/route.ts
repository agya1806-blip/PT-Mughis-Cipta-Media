import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status") || ""

  const where: { role: string; approvalStatus?: string } = { role: "RESELLER" }
  if (status) where.approvalStatus = status

  const resellers = await prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      approvalStatus: true,
      referralCode: true,
      createdAt: true,
      _count: { select: { orders: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(resellers)
}

export async function PUT(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const { userId, approvalStatus } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 })
    }
    if (!["approved", "rejected", "pending"].includes(approvalStatus)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const updated = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { approvalStatus },
      select: {
        id: true,
        name: true,
        email: true,
        approvalStatus: true,
      },
    })

    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: "Failed to update reseller" }, { status: 500 })
  }
}
