export interface ProductVariant {
  id: string
  name: string // e.g. "RAM 8GB / SSD 256GB"
  priceText: string // e.g. "Rp 3.750.000"
  originalPriceText?: string // e.g. "Rp 4.500.000"
  isDefault?: boolean
}

export interface ProductItem {
  id: string
  slug?: string
  title: string
  category: "laptop" | "digital" | "budget" | string
  useCase?: "mahasiswa" | "kantor" | "editing" | "all" | string
  badge: string
  badgeColor?: string
  stockStatus?: "READY" | "LIMITED" | "SOLD_OUT" | "HIDDEN"
  priceText: string
  rawPriceText?: string
  originalPriceText?: string
  discountPercent?: number
  rating?: number
  soldCount?: number
  image: string
  images?: string[]
  video?: string
  shortDesc: string
  specs: string[]
  variants?: ProductVariant[]
  conditionNote?: string
  warranty?: string
  bonus?: string
}

export interface BankAccount {
  id: string
  bank: string
  account_number: string
  beneficiary: string
}

export interface TestimonialItem {
  id: string
  name: string
  location: string
  rating: number
  text: string
  photoUrl?: string
}
