import { MOCK_PROVINCES } from '@/lib/rajaongkir'

export async function GET() {
  try {
    return Response.json(MOCK_PROVINCES)
  } catch {
    return Response.json({ error: 'Failed to fetch provinces' }, { status: 500 })
  }
}
