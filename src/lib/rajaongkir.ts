const RAJAONGKIR_BASE = 'https://api.rajaongkir.com/starter'
const API_KEY = process.env.RAJAONGKIR_API_KEY || ''

export interface RajaOngkirCostRequest {
  origin: string
  destination: string
  weight: number
  courier: string
}

export interface RajaOngkirCostResponse {
  rajaongkir: {
    query: RajaOngkirCostRequest
    status: { code: number; description: string }
    results: Array<{
      code: string
      name: string
      costs: Array<{
        service: string
        description: string
        cost: Array<{ value: number; etd: string; note: string }>
      }>
    }>
  }
}

async function rajaongkirFetch<T>(endpoint: string, body?: Record<string, string>): Promise<T> {
  const url = `${RAJAONGKIR_BASE}/${endpoint}`
  const options: RequestInit = {
    headers: {
      key: API_KEY,
      'content-type': 'application/x-www-form-urlencoded',
    },
  }

  if (body) {
    options.method = 'POST'
    options.body = new URLSearchParams(body).toString()
  }

  const res = await fetch(url, options)
  if (!res.ok) {
    throw new Error(`RajaOngkir API error: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export async function getProvinces() {
  const data = await rajaongkirFetch<{
    rajaongkir: { results: Array<{ province_id: string; province: string }> }
  }>('province')
  return data.rajaongkir.results
}

export async function getCities(provinceId: string) {
  const data = await rajaongkirFetch<{
    rajaongkir: { results: Array<{ city_id: string; city_name: string; postal_code: string }> }
  }>(`city?province=${provinceId}`)
  return data.rajaongkir.results
}

export async function getShippingCost(params: RajaOngkirCostRequest) {
  const data = await rajaongkirFetch<RajaOngkirCostResponse>('cost', {
    origin: params.origin,
    destination: params.destination,
    weight: String(params.weight),
    courier: params.courier,
  })
  return data.rajaongkir.results
}

export const MOCK_PROVINCES = [
  { province_id: '11', province: 'Aceh' },
  { province_id: '12', province: 'Sumatera Utara' },
  { province_id: '13', province: 'Sumatera Barat' },
  { province_id: '14', province: 'Riau' },
  { province_id: '15', province: 'Jambi' },
  { province_id: '16', province: 'Sumatera Selatan' },
  { province_id: '17', province: 'Bengkulu' },
  { province_id: '18', province: 'Lampung' },
  { province_id: '19', province: 'Kepulauan Bangka Belitung' },
  { province_id: '21', province: 'Kepulauan Riau' },
  { province_id: '31', province: 'DKI Jakarta' },
  { province_id: '32', province: 'Jawa Barat' },
  { province_id: '33', province: 'Jawa Tengah' },
  { province_id: '34', province: 'DI Yogyakarta' },
  { province_id: '35', province: 'Jawa Timur' },
  { province_id: '36', province: 'Banten' },
]

export function getMockCities(provinceId: string) {
  const map: Record<string, Array<{ city_id: string; city_name: string; postal_code: string }>> = {
    '31': [
      { city_id: '152', city_name: 'Jakarta Pusat', postal_code: '10110' },
      { city_id: '153', city_name: 'Jakarta Barat', postal_code: '11110' },
      { city_id: '154', city_name: 'Jakarta Selatan', postal_code: '12110' },
      { city_id: '155', city_name: 'Jakarta Timur', postal_code: '13110' },
      { city_id: '156', city_name: 'Jakarta Utara', postal_code: '14110' },
    ],
    '32': [
      { city_id: '23', city_name: 'Bandung', postal_code: '40111' },
      { city_id: '96', city_name: 'Bekasi', postal_code: '17111' },
      { city_id: '77', city_name: 'Bogor', postal_code: '16111' },
      { city_id: '153', city_name: 'Depok', postal_code: '16411' },
      { city_id: '343', city_name: 'Cimahi', postal_code: '40511' },
    ],
    '35': [
      { city_id: '444', city_name: 'Surabaya', postal_code: '60111' },
      { city_id: '445', city_name: 'Malang', postal_code: '65111' },
      { city_id: '449', city_name: 'Sidoarjo', postal_code: '61211' },
      { city_id: '451', city_name: 'Gresik', postal_code: '61111' },
    ],
    '36': [
      { city_id: '157', city_name: 'Tangerang', postal_code: '15111' },
      { city_id: '158', city_name: 'Tangerang Selatan', postal_code: '15311' },
      { city_id: '159', city_name: 'Cilegon', postal_code: '42411' },
    ],
    '33': [
      { city_id: '255', city_name: 'Semarang', postal_code: '50111' },
      { city_id: '257', city_name: 'Surakarta', postal_code: '57111' },
      { city_id: '259', city_name: 'Magelang', postal_code: '56111' },
    ],
    '34': [
      { city_id: '501', city_name: 'Yogyakarta', postal_code: '55111' },
      { city_id: '502', city_name: 'Sleman', postal_code: '55211' },
      { city_id: '503', city_name: 'Bantul', postal_code: '55711' },
    ],
    '11': [
      { city_id: '1', city_name: 'Banda Aceh', postal_code: '23111' },
      { city_id: '2', city_name: 'Sabang', postal_code: '23511' },
    ],
    '12': [
      { city_id: '128', city_name: 'Medan', postal_code: '20111' },
      { city_id: '129', city_name: 'Binjai', postal_code: '20711' },
    ],
    '13': [
      { city_id: '140', city_name: 'Padang', postal_code: '25111' },
      { city_id: '141', city_name: 'Bukittinggi', postal_code: '26111' },
    ],
    '14': [
      { city_id: '187', city_name: 'Pekanbaru', postal_code: '28111' },
      { city_id: '188', city_name: 'Dumai', postal_code: '28811' },
    ],
  }
  return map[provinceId] || [{ city_id: '0', city_name: 'Kota Lainnya', postal_code: '00000' }]
}

export function getMockShippingCost(
  origin: string,
  destination: string,
  weight: number,
  courier: string
) {
  const baseRate = weight * 50
  const couriers: Record<string, Array<{ service: string; cost: number; etd: string; description: string }>> = {
    jne: [
      { service: 'OKE', cost: baseRate + 5000, etd: '2-3', description: 'Ongkos Kirim Ekonomis' },
      { service: 'REG', cost: baseRate + 10000, etd: '1-2', description: 'Layanan Reguler' },
      { service: 'YES', cost: baseRate + 20000, etd: '1-1', description: 'Yakin Esok Sampai' },
    ],
    jnt: [
      { service: 'EZ', cost: baseRate + 8000, etd: '2-3', description: 'J&T Ekonomi' },
      { service: 'REG', cost: baseRate + 12000, etd: '1-2', description: 'J&T Reguler' },
    ],
    pos: [
      { service: 'Reguler', cost: baseRate + 7000, etd: '2-5', description: 'POS Reguler' },
      { service: 'Express', cost: baseRate + 15000, etd: '1-2', description: 'POS Express' },
    ],
    sicepat: [
      { service: 'REG', cost: baseRate + 10000, etd: '1-2', description: 'SiCepat Reguler' },
      { service: 'BEST', cost: baseRate + 25000, etd: '1-1', description: 'SiCepat Besok Sampai' },
    ],
  }
  return couriers[courier] || []
}
