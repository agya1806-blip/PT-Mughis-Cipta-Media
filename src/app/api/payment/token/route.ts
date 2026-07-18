import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSnapTokenMock } from '@/lib/midtrans'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId } = body

    if (!orderId) {
      return Response.json({ error: 'orderId is required' }, { status: 400 })
    }

    const order = await prisma.order.findUnique({
      where: { orderId },
      include: { items: true },
    })
    if (!order) {
      return Response.json({ error: 'Order not found' }, { status: 404 })
    }

    const snap = await getSnapTokenMock(order.orderId)

    await prisma.order.update({
      where: { orderId },
      data: {
        paymentToken: snap.token,
        paymentUrl: snap.redirect_url,
      },
    })

    return Response.json({
      token: snap.token,
      redirect_url: snap.redirect_url,
    })
  } catch {
    return Response.json({ error: 'Failed to create payment token' }, { status: 500 })
  }
}
