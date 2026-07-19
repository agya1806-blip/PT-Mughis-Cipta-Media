import { createHash } from 'crypto'
import { CartItem, Customer } from './types'

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || ''
const MIDTRANS_BASE = process.env.MIDTRANS_IS_PRODUCTION === 'true'
  ? 'https://app.midtrans.com/snap/v1'
  : 'https://app.sandbox.midtrans.com/snap/v1'

export interface SnapTransactionRequest {
  transaction_details: {
    order_id: string
    gross_amount: number
  }
  item_details: Array<{
    id: string
    price: number
    quantity: number
    name: string
  }>
  customer_details: {
    first_name: string
    email: string
    phone: string
    billing_address: {
      first_name: string
      email: string
      phone: string
      address: string
      city: string
      postal_code: string
    }
  }
}

export interface SnapTransactionResponse {
  token: string
  redirect_url: string
}

async function midtransFetch<T>(body: SnapTransactionRequest): Promise<T> {
  const auth = Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64')

  const res = await fetch(`${MIDTRANS_BASE}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Midtrans API error: ${res.status} - ${err}`)
  }

  return res.json()
}

export async function createSnapTransaction(
  orderId: string,
  items: CartItem[],
  customer: Customer,
  shippingCost: number
): Promise<SnapTransactionResponse> {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const itemDetails = items.map((item) => ({
    id: item.bookId,
    price: item.price,
    quantity: item.quantity,
    name: item.title,
  }))

  if (shippingCost > 0) {
    itemDetails.push({
      id: 'SHIPPING',
      price: shippingCost,
      quantity: 1,
      name: 'Biaya Pengiriman',
    })
  }

  const requestBody: SnapTransactionRequest = {
    transaction_details: {
      order_id: orderId,
      gross_amount: subtotal + shippingCost,
    },
    item_details: itemDetails,
    customer_details: {
      first_name: customer.name,
      email: customer.email,
      phone: customer.whatsapp,
      billing_address: {
        first_name: customer.name,
        email: customer.email,
        phone: customer.whatsapp,
        address: customer.address,
        city: customer.city,
        postal_code: customer.postalCode,
      },
    },
  }

  return midtransFetch<SnapTransactionResponse>(requestBody)
}

export function verifyWebhookSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string
): boolean {
  const hash = createHash('sha512')
    .update(`${orderId}${statusCode}${grossAmount}${MIDTRANS_SERVER_KEY}`)
    .digest('hex')
  return signatureKey === hash
}

export async function getSnapTokenMock(orderId: string): Promise<SnapTransactionResponse> {
  return {
    token: `mock-token-${orderId}-${Date.now()}`,
    redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/${orderId}`,
  }
}
