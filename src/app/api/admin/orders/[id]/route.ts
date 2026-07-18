import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { id } = await params
  const order = await prisma.order.findUnique({
    where: { id: parseInt(id) },
    include: { items: true, user: { select: { id: true, name: true, email: true } } },
  })
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json(order)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser()
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { id } = await params
  try {
    const body = await request.json()
    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        status: body.status || undefined,
        shippingAwb: body.shippingAwb || undefined,
        notes: body.notes || undefined,
      },
      include: { items: true },
    })

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
