import { createHash } from "crypto"

const MIDTRANS_SNAP = process.env.MIDTRANS_SNAP_URL || "https://app.sandbox.midtrans.com/snap/v1"
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || ""
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY || ""

export interface MidtransTransactionParams {
  orderId: string
  grossAmount: number
  customerName: string
  customerEmail: string
  customerPhone?: string
  items: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
}

export interface MidtransTransactionResponse {
  token: string
  redirect_url: string
}

export async function createTransactionToken(
  params: MidtransTransactionParams
): Promise<MidtransTransactionResponse> {
  const auth = Buffer.from(MIDTRANS_SERVER_KEY + ":").toString("base64")

  const body = {
    transaction_details: {
      order_id: params.orderId,
      gross_amount: params.grossAmount,
    },
    customer_details: {
      first_name: params.customerName,
      email: params.customerEmail,
      phone: params.customerPhone,
    },
    item_details: params.items,
    credit_card: { secure: true },
    enabled_payments: [
      "qris",
      "gopay",
      "shopeepay",
      "other_ewallet",
      "bank_transfer",
      "bca_va",
      "bni_va",
      "bri_va",
      "mandiri_va",
      "cstore",
    ],
  }

  const res = await fetch(`${MIDTRANS_SNAP}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Midtrans error: ${err}`)
  }

  return res.json()
}

export function verifyMidtransNotification(payload: string, signatureKey: string): boolean {
  const expected = signatureKey
  const data = JSON.parse(payload)
  const orderId = data.order_id
  const statusCode = data.status_code
  const grossAmount = data.gross_amount
  const serverKey = MIDTRANS_SERVER_KEY
  const computed = createHash("sha512")
    .update(orderId + statusCode + grossAmount + serverKey)
    .digest("hex")
  return computed === expected
}

export { MIDTRANS_CLIENT_KEY }
