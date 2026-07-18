import { NextRequest } from 'next/server'
import { orderStore } from '@/lib/order-store'
import { books } from '@/lib/data'
import { verifyMidtransNotification } from '@/lib/payment'

type MidtransStatus = 'capture' | 'settlement' | 'pending' | 'deny' | 'cancel' | 'expire' | 'failure'

const STATUS_MAP: Record<MidtransStatus, string> = {
  capture: 'paid',
  settlement: 'paid',
  pending: 'pending',
  deny: 'cancelled',
  cancel: 'cancelled',
  expire: 'cancelled',
  failure: 'cancelled',
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.text()
    const body = JSON.parse(raw)

    const {
      order_id: orderId,
      transaction_status: transactionStatus,
      status_code: statusCode,
      gross_amount: grossAmount,
      signature_key: signatureKey,
    } = body

    if (!orderId || !transactionStatus) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (signatureKey && statusCode && grossAmount) {
      const valid = verifyMidtransNotification(raw, signatureKey)
      if (!valid) {
        return Response.json({ error: 'Invalid signature' }, { status: 403 })
      }
    }

    const newStatus = STATUS_MAP[transactionStatus as MidtransStatus] || 'pending'

    orderStore.update(orderId, { status: newStatus as 'pending' | 'paid' | 'cancelled' })

    if (newStatus === 'paid') {
      const order = orderStore.get(orderId)
      if (order) {
        for (const item of order.items) {
          const book = books.find((b) => b.id === item.bookId)
          if (book) {
            book.stock = Math.max(0, book.stock - item.quantity)
          }
        }
      }
    }

    return Response.json({ status: 'ok' })
  } catch (err) {
    console.error('Webhook error:', err)
    return Response.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
