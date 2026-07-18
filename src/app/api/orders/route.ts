import { NextRequest } from 'next/server'
import { orderStore } from '@/lib/order-store'
import { ShippingOption } from '@/lib/types'

interface OrderItem {
  bookId: string
  title: string
  price: number
  quantity: number
  weight: number
  coverImage: string
}

interface CustomerInput {
  name: string
  email: string
  whatsapp: string
  address: string
  province: string
  provinceId: string
  city: string
  cityId: string
  subdistrict: string
  postalCode: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, customer, shipping } = body as {
      items: OrderItem[]
      customer: CustomerInput
      shipping: ShippingOption
    }

    if (!items?.length || !customer) {
      return Response.json({ error: 'items and customer are required' }, { status: 400 })
    }

    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const shippingCost = shipping?.cost || 0
    const grandTotal = subtotal + shippingCost

    const order = {
      id: `INV-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      items,
      customer,
      shipping: shipping || null,
      subtotal,
      shippingCost,
      grandTotal,
      status: 'pending' as const,
      snapToken: null,
      snapRedirectUrl: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    orderStore.create(order)
    return Response.json({ order }, { status: 201 })
  } catch {
    return Response.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id')
    if (id) {
      const order = orderStore.get(id)
      if (!order) {
        return Response.json({ error: 'Order not found' }, { status: 404 })
      }
      return Response.json({ order })
    }
    return Response.json({ orders: orderStore.all() })
  } catch {
    return Response.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
