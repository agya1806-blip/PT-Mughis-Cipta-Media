import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || ""

export async function POST(request: Request) {
  try {
    const raw = await request.text()
    const body = JSON.parse(raw)

    const orderId = body.order_id
    const statusCode = String(body.status_code)
    const grossAmount = body.gross_amount
    const transactionStatus = body.transaction_status
    const fraudStatus = body.fraud_status
    const paymentType = body.payment_type

    const signature = crypto
      .createHash("sha512")
      .update(orderId + statusCode + grossAmount + MIDTRANS_SERVER_KEY)
      .digest("hex")

    if (signature !== body.signature_key) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 })
    }

    const order = await prisma.order.findUnique({ where: { orderId }, include: { items: true } })
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    let newStatus = order.status

    if (transactionStatus === "settlement" || transactionStatus === "capture") {
      if (fraudStatus === "accept" || fraudStatus === "success") {
        newStatus = "PAID"
      }
    } else if (transactionStatus === "pending") {
      newStatus = "PENDING"
    } else if (
      transactionStatus === "deny" ||
      transactionStatus === "cancel" ||
      transactionStatus === "expire"
    ) {
      newStatus = "CANCELLED"
      for (const item of order.items) {
        await prisma.book.update({
          where: { id: item.bookId },
          data: { stock: { increment: item.quantity } },
        })
      }
    }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: newStatus,
        paymentMethod: paymentType,
        paymentChannel: mapPaymentChannel(paymentType),
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

function mapPaymentChannel(type: string) {
  const ewallet = ["gopay", "shopeepay", "dana", "ovo", "linkaja"]
  const va = ["bank_transfer", "bca_va", "bni_va", "bri_va", "mandiri_va"]
  const cstore = ["cstore", "alfamart", "indomaret"]

  if (type === "qris") return "QRIS"
  if (ewallet.includes(type)) return "E_WALLET"
  if (va.includes(type)) return "VIRTUAL_ACCOUNT"
  if (cstore.includes(type)) return "CONVENIENCE_STORE"
  return null
}
