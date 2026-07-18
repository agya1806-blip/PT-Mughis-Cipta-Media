import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyMidtransNotification } from '@/lib/payment'
import { $Enums } from '@/lib/__generated__/prisma/client'

type MidtransStatus = 'capture' | 'settlement' | 'pending' | 'deny' | 'cancel' | 'expire' | 'failure'

const STATUS_MAP = {
  capture: 'PAID',
  settlement: 'PAID',
  pending: 'PENDING',
  deny: 'CANCELLED',
  cancel: 'CANCELLED',
  expire: 'CANCELLED',
  failure: 'CANCELLED',
} as const satisfies Record<MidtransStatus, string>

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

    const newStatus = STATUS_MAP[transactionStatus as MidtransStatus] || 'PENDING'

    await prisma.order.update({
      where: { orderId },
      data: { status: newStatus as $Enums.OrderStatus },
    })

    if (newStatus === 'PAID') {
      const order = await prisma.order.findUnique({
        where: { orderId },
        include: { items: true },
      })
      if (order) {
        for (const item of order.items) {
          await prisma.book.update({
            where: { id: item.bookId },
            data: { stock: { decrement: item.quantity } },
          })
        }
      }
    }

    return Response.json({ status: 'ok' })
  } catch (err) {
    console.error('Webhook error:', err)
    return Response.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
