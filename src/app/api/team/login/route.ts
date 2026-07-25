import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { verifyPassword, signTeamToken } from "@/lib/team/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      )
    }

    const member = await prisma.teamMember.findUnique({
      where: { email },
    })
    if (!member || member.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      )
    }

    const valid = await verifyPassword(password, member.password)
    if (!valid) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      )
    }

    const token = signTeamToken({
      teamMemberId: member.id,
      email: member.email,
      role: member.role,
    })

    const cookieStore = await cookies()
    cookieStore.set("team_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })

    return NextResponse.json({
      success: true,
      member: {
        id: member.id,
        name: member.name,
        role: member.role,
      },
    })
  } catch (error) {
    console.error("Team login error:", error)
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
