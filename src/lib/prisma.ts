import { PrismaClient } from "./__generated__/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  try {
    const connectionString = process.env.DATABASE_URL || ""
    const adapter = new PrismaPg({ connectionString })
    return new PrismaClient({ adapter })
  } catch {
    return new PrismaClient()
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
