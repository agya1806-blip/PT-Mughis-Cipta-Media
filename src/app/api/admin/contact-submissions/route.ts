import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(submissions)
  } catch {
    return NextResponse.json({ error: "Gagal memuat" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { ids } = await request.json()
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "ids harus berupa array" }, { status: 400 })
    }

    const idsNum = ids.map((id: unknown) => Number(id)).filter((n: number) => !isNaN(n))
    if (idsNum.length === 0) {
      return NextResponse.json({ error: "ids tidak valid" }, { status: 400 })
    }

    await prisma.contactSubmission.updateMany({
      where: { id: { in: idsNum } },
      data: { isRead: true },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Gagal update" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const idStr = searchParams.get("id")
    if (!idStr) {
      return NextResponse.json({ error: "id diperlukan" }, { status: 400 })
    }

    const id = Number(idStr)
    if (isNaN(id)) {
      return NextResponse.json({ error: "id tidak valid" }, { status: 400 })
    }

    await prisma.contactSubmission.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Gagal hapus" }, { status: 500 })
  }
}
