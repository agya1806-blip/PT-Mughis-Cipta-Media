import { NextResponse } from "next/server"
import { sendTelegramMessage, sendTelegramPhoto } from "@/lib/telegram"
import { uploadFile } from "@/lib/upload"

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
  return uploadFile(file, dir)
}

function formatWhatsApp(wa: string): string {
  const digits = wa.replace(/\D/g, "")
  if (digits.startsWith("0")) return "62" + digits.slice(1)
  if (digits.startsWith("62")) return digits
  return digits
}

function buildTelegramMessage(data: FormDataEntry, regNumber: string): string {
  const now = new Date()
  const dateStr = now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const timeStr = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const statusLabel: Record<string, string> = {
    belum_selesai: "Belum selesai",
    sedang_ditulis: "Sedang ditulis",
    sudah_selesai: "Sudah selesai",
  }

  return `
<b>📚 PENDAFTARAN BARU</b>
<b>🏢 Program Apresiasi Penulis</b>
─────────────────────

<b>👤 Data Diri</b>
• Nama Lengkap  : ${data.nama || "-"}
• WhatsApp      : <a href="https://wa.me/${formatWhatsApp(data.whatsapp)}">${data.whatsapp}</a>
• Email         : ${data.email || "-"}

<b>📖 Data Buku</b>
• Judul Buku    : ${data.judulBuku || "-"}
• Kategori      : ${data.kategoriBuku || "-"}
• Status Naskah : ${statusLabel[data.statusNaskah] || data.statusNaskah || "-"}

<b>🆔 Informasi Pendaftaran</b>
• No. Registrasi : <b>${regNumber}</b>
• Tanggal        : ${dateStr}
• Jam            : ${timeStr}
`.trim()
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
      return NextResponse.json(
        { error: "Data wajib tidak lengkap" },
        { status: 400 }
      )
    }

    const fileNaskah = formData.get("fileNaskah") as File | null
    const fileCover = formData.get("fileCover") as File | null
    const fileBuktiFollow = formData.get("fileBuktiFollow") as File | null
    const fileBuktiFollowFounder = formData.get(
      "fileBuktiFollowFounder"
    ) as File | null

    const save = (f: File | null, dir: string) =>
      f instanceof File ? saveFile(f, dir) : Promise.resolve(null)

    const [naskahUrl, coverUrl, buktiUrl, buktiFounderUrl] = await Promise.all(
      [
        save(fileNaskah, "campaign/naskah"),
        save(fileCover, "campaign/cover"),
        save(fileBuktiFollow, "campaign/bukti"),
        save(fileBuktiFollowFounder, "campaign/bukti"),
      ]
    )

    const id = Date.now()
    const year = new Date().getFullYear()
    const registrationNumber = `MCM-${year}-${String(id)
      .slice(-4)
      .padStart(4, "0")}`

    // Send to Telegram (non-blocking — don't block registration on notification)
    const text = buildTelegramMessage(data, registrationNumber)
    Promise.all([
      sendTelegramMessage(text).catch(() => {}),
      buktiUrl ? sendTelegramPhoto(buktiUrl, "Bukti Follow Instagram PT Mughis Cipta Media").catch(() => {}) : Promise.resolve(),
      buktiFounderUrl ? sendTelegramPhoto(buktiFounderUrl, "Bukti Follow Instagram Founder @mhdaghisna_").catch(() => {}) : Promise.resolve(),
    ])

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
    return NextResponse.json(
      {
        error:
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan server",
      },
      { status: 500 }
    )
  }
}
