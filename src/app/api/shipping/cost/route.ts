import { NextRequest } from 'next/server'
import { getMockShippingCost } from '@/lib/rajaongkir'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { destination, weight, courier } = body

    if (!destination || !weight || !courier) {
      return Response.json({ error: 'destination, weight, and courier are required' }, { status: 400 })
    }

    const costs = getMockShippingCost('501', destination, Number(weight), courier)
    const result = [{
      code: courier,
      name: courier.toUpperCase(),
      costs: costs.map((c) => ({
        service: c.service,
        description: c.description,
        cost: c.cost,
        etd: c.etd,
      })),
    }]

    return Response.json(result)
  } catch {
    return Response.json({ error: 'Failed to calculate shipping cost' }, { status: 500 })
  }
}
