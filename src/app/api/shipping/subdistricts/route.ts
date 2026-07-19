import { NextRequest } from 'next/server'

const MOCK_SUBDISTRICTS: Record<string, Array<{ subdistrict_id: string; subdistrict_name: string }>> = {
  '152': [
    { subdistrict_id: '1521', subdistrict_name: 'Gambir' },
    { subdistrict_id: '1522', subdistrict_name: 'Tanah Abang' },
    { subdistrict_id: '1523', subdistrict_name: 'Menteng' },
  ],
  '153': [
    { subdistrict_id: '1531', subdistrict_name: 'Palmerah' },
    { subdistrict_id: '1532', subdistrict_name: 'Kebon Jeruk' },
    { subdistrict_id: '1533', subdistrict_name: 'Cengkareng' },
  ],
  '154': [
    { subdistrict_id: '1541', subdistrict_name: 'Kebayoran Baru' },
    { subdistrict_id: '1542', subdistrict_name: 'Pondok Indah' },
    { subdistrict_id: '1543', subdistrict_name: 'Cilandak' },
  ],
  '23': [
    { subdistrict_id: '231', subdistrict_name: 'Coblong' },
    { subdistrict_id: '232', subdistrict_name: 'Bandung Wetan' },
    { subdistrict_id: '233', subdistrict_name: 'Sukajadi' },
  ],
  '444': [
    { subdistrict_id: '4441', subdistrict_name: 'Tegalsari' },
    { subdistrict_id: '4442', subdistrict_name: 'Wonokromo' },
    { subdistrict_id: '4443', subdistrict_name: 'Pabean Cantikan' },
  ],
}

export async function GET(req: NextRequest) {
  try {
    const city = req.nextUrl.searchParams.get('city')
    if (!city) {
      return Response.json({ error: 'city is required' }, { status: 400 })
    }
    const subdistricts = MOCK_SUBDISTRICTS[city] || [
      { subdistrict_id: `${city}01`, subdistrict_name: 'Kecamatan Lainnya' },
    ]
    return Response.json(subdistricts)
  } catch {
    return Response.json({ error: 'Failed to fetch subdistricts' }, { status: 500 })
  }
}
