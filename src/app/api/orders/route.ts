import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, customer, shipping } = body

    if (!items?.length || !customer) {
      return Response.json({ error: 'items and customer are required' }, { status: 400 })
    }

    const subtotal = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0)
    const shippingCost = shipping?.cost || 0
    const grandTotal = subtotal + shippingCost
    const orderId = `INV-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`

    const order = await prisma.order.create({
      data: {
        orderId,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.whatsapp || null,
        shippingAddress: customer.address,
        province: customer.province || '',
        city: customer.city || '',
        subdistrict: customer.subdistrict || '',
        courier: shipping?.courier || null,
        courierService: shipping?.service || null,
        shippingCost,
        shippingEtd: shipping?.etd || null,
        subtotal,
        total: grandTotal,
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

    return Response.json({ order }, { status: 201 })
  } catch (err) {
    console.error('Create order error:', err)
    return Response.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id')
    if (id) {
      const order = await prisma.order.findUnique({
        where: { orderId: id },
        include: { items: true },
      })
      if (!order) {
        return Response.json({ error: 'Order not found' }, { status: 404 })
      }
      return Response.json({ order })
    }
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    })
    return Response.json({ orders })
  } catch {
    return Response.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
