export interface Book {
  id: string
  title: string
  author: string
  price: number
  weight: number
  coverImage: string
  stock: number
  isbn: string
  category: string
}

export interface CartItem {
  bookId: string
  title: string
  price: number
  quantity: number
  weight: number
  coverImage: string
}

export interface Customer {
  name: string
  email: string
  whatsapp: string
  address: string
  province: string
  provinceId: string
  city: string
  cityId: string
  subdistrict: string
  postalCode: string
}

export interface ShippingOption {
  courier: string
  service: string
  cost: number
  etd: string
  description: string
}

export interface Province {
  province_id: string
  province: string
}

export interface City {
  city_id: string
  city_name: string
  postal_code: string
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface Order {
  id: string
  items: CartItem[]
  customer: Customer
  shipping: ShippingOption | null
  subtotal: number
  shippingCost: number
  grandTotal: number
  status: OrderStatus
  snapToken: string | null
  snapRedirectUrl: string | null
  createdAt: string
  updatedAt: string
}
