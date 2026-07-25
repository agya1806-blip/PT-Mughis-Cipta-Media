import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

function getJwtSecret(): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required")
  }
  return process.env.JWT_SECRET
}

export interface TeamJwtPayload {
  teamMemberId: number
  email: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function signTeamToken(payload: TeamJwtPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" })
}

export function verifyTeamToken(token: string): TeamJwtPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as TeamJwtPayload
  } catch {
    return null
  }
}

export async function getCurrentTeamMember() {
  const cookieStore = await cookies()
  const token = cookieStore.get("team_token")?.value
  if (!token) return null

  const payload = verifyTeamToken(token)
  if (!payload) return null

  const member = await prisma.teamMember.findUnique({
    where: { id: payload.teamMemberId },
  })
  return member
}
