import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

interface FormDataEntry {
  nama: string
  whatsapp: string
  email: string
  provinsi: string
  kota: string
  alamat: string
  judulBuku: string
  kategoriBuku: string
  jumlahHalaman: number
  statusNaskah: string
  targetTerbit: string
  deskripsiBuku: string
}

async function saveFile(file: File, dir: string): Promise<string | null> {
  if (!file) return null
  const ext = file.name.split(".").pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const uploadDir = path.join(process.cwd(), "public", "uploads", dir)
  await mkdir(uploadDir, { recursive: true })
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(path.join(uploadDir, filename), buffer)
  return `/uploads/${dir}/${filename}`
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const data: FormDataEntry = {
      nama: (formData.get("nama") as string) || "",
      whatsapp: (formData.get("whatsapp") as string) || "",
      email: (formData.get("email") as string) || "",
      provinsi: (formData.get("provinsi") as string) || "",
      kota: (formData.get("kota") as string) || "",
      alamat: (formData.get("alamat") as string) || "",
      judulBuku: (formData.get("judulBuku") as string) || "",
      kategoriBuku: (formData.get("kategoriBuku") as string) || "",
      jumlahHalaman: parseInt(formData.get("jumlahHalaman") as string) || 0,
      statusNaskah: (formData.get("statusNaskah") as string) || "",
      targetTerbit: (formData.get("targetTerbit") as string) || "",
      deskripsiBuku: (formData.get("deskripsiBuku") as string) || "",
    }

    if (!data.nama || !data.whatsapp || !data.email) {
      return NextResponse.json({ error: "Data wajib tidak lengkap" }, { status: 400 })
    }

    const fileNaskah = formData.get("fileNaskah") as File | null
    const fileCover = formData.get("fileCover") as File | null
    const fileBuktiFollow = formData.get("fileBuktiFollow") as File | null
    const fileBuktiFollowFounder = formData.get("fileBuktiFollowFounder") as File | null

    const [naskahUrl, coverUrl, buktiUrl, buktiFounderUrl] = await Promise.all([
      saveFile(fileNaskah!, "campaign/naskah"),
      saveFile(fileCover!, "campaign/cover"),
      saveFile(fileBuktiFollow!, "campaign/bukti"),
      saveFile(fileBuktiFollowFounder!, "campaign/bukti"),
    ])

    const id = Date.now()
    const year = new Date().getFullYear()
    const registrationNumber = `MCM-${year}-${String(id).slice(-4).padStart(4, "0")}`

    const payload = {
      id,
      registrationNumber,
      ...data,
      fileNaskahUrl: naskahUrl,
      fileCoverUrl: coverUrl,
      fileBuktiFollowUrl: buktiUrl,
      fileBuktiFollowFounderUrl: buktiFounderUrl,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(payload, { status: 201 })
  } catch (error) {
    console.error("Campaign registration error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
