import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { getSnapTokenMock } from '@/lib/midtrans'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      items, customerName, customerEmail, customerPhone,
      shippingAddress, province, city, subdistrict,
      courier, courierService, shippingCost, shippingEtd,
    } = body

    if (!items?.length || !customerName || !customerEmail || !shippingAddress) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const subtotal = items.reduce((s: number, i: any) => s + i.price * i.quantity, 0)
    const total = subtotal + (shippingCost || 0)
    const orderId = `INV-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`

    const user = await getCurrentUser()

    const order = await prisma.order.create({
      data: {
        orderId,
        userId: user?.id || null,
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        shippingAddress,
        province: province || '',
        city: city || '',
        subdistrict: subdistrict || '',
        courier: courier || null,
        courierService: courierService || null,
        shippingCost: shippingCost || 0,
        shippingEtd: shippingEtd || null,
        subtotal,
        total,
        status: 'PENDING',
        items: {
          create: items.map((i: any) => ({
            bookId: parseInt(i.bookId),
            title: i.title || 'Buku',
            price: i.price,
            quantity: i.quantity,
            weight: i.weight || 0,
          })),
        },
      },
      include: { items: true },
    })

    const snap = await getSnapTokenMock(order.orderId)

    await prisma.order.update({
      where: { orderId },
      data: {
        paymentToken: snap.token,
        paymentUrl: snap.redirect_url,
      },
    })

    return Response.json({ orderId, paymentUrl: snap.redirect_url, token: snap.token }, { status: 201 })
  } catch (err) {
    console.error('Checkout error:', err)
    return Response.json({ error: 'Failed to process checkout' }, { status: 500 })
  }
}
