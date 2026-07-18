import { NextRequest } from 'next/server'
import { getMockCities } from '@/lib/rajaongkir'

export async function GET(req: NextRequest) {
  try {
    const province = req.nextUrl.searchParams.get('province')
    if (!province) {
      return Response.json({ error: 'province is required' }, { status: 400 })
    }
    const cities = getMockCities(province)
    return Response.json(cities)
  } catch {
    return Response.json({ error: 'Failed to fetch cities' }, { status: 500 })
  }
}
