import { NextRequest } from 'next/server'
import { orderStore } from '@/lib/order-store'
import { getSnapTokenMock } from '@/lib/midtrans'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId } = body

    if (!orderId) {
      return Response.json({ error: 'orderId is required' }, { status: 400 })
    }

    const order = orderStore.get(orderId)
    if (!order) {
      return Response.json({ error: 'Order not found' }, { status: 404 })
    }

    const snap = await getSnapTokenMock(order.id)

    orderStore.update(orderId, {
      snapToken: snap.token,
      snapRedirectUrl: snap.redirect_url,
    })

    return Response.json({
      token: snap.token,
      redirect_url: snap.redirect_url,
    })
  } catch {
    return Response.json({ error: 'Failed to create payment token' }, { status: 500 })
  }
}
