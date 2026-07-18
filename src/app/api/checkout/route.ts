import { NextRequest } from 'next/server'
import { orderStore } from '@/lib/order-store'
import { getSnapTokenMock } from '@/lib/midtrans'

interface CheckoutItem {
  bookId: string
  title: string
  price: number
  quantity: number
  weight: number
  coverImage: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      items,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      province,
      city,
      subdistrict,
      courier,
      courierService,
      shippingCost,
      shippingEtd,
    } = body

    if (!items?.length || !customerName || !customerEmail || !shippingAddress) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const orderId = `INV-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`

    const order = {
      id: orderId,
      items: (items as CheckoutItem[]).map((i) => ({
        bookId: i.bookId,
        title: i.title || 'Buku',
        price: i.price,
        quantity: i.quantity,
        weight: i.weight || 0,
        coverImage: i.coverImage || '',
      })),
      customer: {
        name: customerName,
        email: customerEmail,
        whatsapp: customerPhone || '',
        address: shippingAddress,
        province: province || '',
        provinceId: '',
        city: city || '',
        cityId: '',
        subdistrict: subdistrict || '',
        postalCode: '',
      },
      shipping: courierService ? {
        courier: courier || '',
        service: courierService,
        cost: shippingCost || 0,
        etd: shippingEtd || '',
        description: '',
      } : null,
      subtotal: (items as CheckoutItem[]).reduce((s, i) => s + i.price * i.quantity, 0),
      shippingCost: shippingCost || 0,
      grandTotal: (items as CheckoutItem[]).reduce((s, i) => s + i.price * i.quantity, 0) + (shippingCost || 0),
      status: 'pending' as const,
      snapToken: null,
      snapRedirectUrl: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    orderStore.create(order)

    const snap = await getSnapTokenMock(order.id)

    orderStore.update(orderId, {
      snapToken: snap.token,
      snapRedirectUrl: snap.redirect_url,
    })

    return Response.json({
      orderId,
      token: snap.token,
      paymentUrl: snap.redirect_url,
    }, { status: 201 })
  } catch (err) {
    console.error('Checkout error:', err)
    return Response.json({ error: 'Failed to process checkout' }, { status: 500 })
  }
}
