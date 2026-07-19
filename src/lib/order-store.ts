import { Order } from './types'

const orders = new Map<string, Order>()

export const orderStore = {
  create(order: Order): void {
    orders.set(order.id, order)
  },

  get(id: string): Order | undefined {
    return orders.get(id)
  },

  update(id: string, partial: Partial<Order>): Order | undefined {
    const existing = orders.get(id)
    if (!existing) return undefined
    const updated = { ...existing, ...partial, updatedAt: new Date().toISOString() }
    orders.set(id, updated)
    return updated
  },

  all(): Order[] {
    return Array.from(orders.values())
  },
}
