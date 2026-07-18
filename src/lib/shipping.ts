const RAJAONGKIR_BASE = process.env.RAJAONGKIR_BASE || "https://api.rajaongkir.com/starter"
const RAJAONGKIR_KEY = process.env.RAJAONGKIR_KEY || ""

export interface RajaOngkirCost {
  service: string
  description: string
  cost: number
  etd: string
}

export interface RajaOngkirCourier {
  code: string
  name: string
  costs: RajaOngkirCost[]
}

export async function getProvinces() {
  const res = await fetch(`${RAJAONGKIR_BASE}/province`, {
    headers: { key: RAJAONGKIR_KEY },
  })
  const json = await res.json()
  return json.rajaongkir?.results || []
}

export async function getCities(provinceId: string) {
  const res = await fetch(`${RAJAONGKIR_BASE}/city?province=${provinceId}`, {
    headers: { key: RAJAONGKIR_KEY },
  })
  const json = await res.json()
  return json.rajaongkir?.results || []
}

export async function getSubdistricts(cityId: string) {
  const res = await fetch(`${RAJAONGKIR_BASE}/subdistrict?city=${cityId}`, {
    headers: { key: RAJAONGKIR_KEY },
  })
  const json = await res.json()
  return json.rajaongkir?.results || []
}

export async function getShippingCost(params: {
  origin: string
  destination: string
  weight: number
  courier: string
}): Promise<RajaOngkirCourier[]> {
  const formData = new URLSearchParams()
  formData.append("origin", params.origin)
  formData.append("destination", params.destination)
  formData.append("weight", String(params.weight))
  formData.append("courier", params.courier)

  const res = await fetch(`${RAJAONGKIR_BASE}/cost`, {
    method: "POST",
    headers: {
      key: RAJAONGKIR_KEY,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  })
  const json = await res.json()
  return json.rajaongkir?.results || []
}
