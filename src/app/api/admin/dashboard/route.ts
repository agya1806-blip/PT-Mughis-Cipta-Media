import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const [totalBooks, totalOrders, pendingOrders, paidOrders, activeResellers, todayOrders, monthOrders] =
    await Promise.all([
      prisma.book.count(),
      prisma.order.count(),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.order.count({ where: { status: "PAID" } }),
      prisma.user.count({ where: { role: "RESELLER", approvalStatus: "approved" } }),
      prisma.order.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.order.findMany({
        where: { status: "PAID", createdAt: { gte: monthStart } },
        select: { total: true },
      }),
    ])

  const monthSales = monthOrders.reduce((sum, o) => sum + Number(o.total), 0)

  return NextResponse.json({
    totalBooks,
    totalOrders,
    pendingOrders,
    paidOrders,
    activeResellers,
    todayOrders,
    monthSales,
  })
}
