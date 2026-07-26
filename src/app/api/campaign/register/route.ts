import { NextResponse } from "next/server"
import { sendTelegramMessage, sendTelegramPhoto, sendTelegramDocument } from "@/lib/telegram"
import { uploadFile } from "@/lib/upload"
import { sendToGoogleSheets } from "@/lib/google"
import type { GooglePayload } from "@/lib/google"

interface FormDataEntry {
  nama: string
  whatsapp: string
  email: string
  provinsi: string
  kota: string
  alamat: string
  judulBuku: string
  kategoriBuku: string
  jenisTerbitan: string
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

function buildTelegramMessage(data: FormDataEntry, regNumber: string, folderUrl?: string): string {
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

  const folderSection = folderUrl
    ? `\n<b>📁 Google Drive</b>\n• Folder      : <a href="${folderUrl}">Lihat File</a>`
    : ""

  return `
<b>📥 PENDAFTAR BARU</b>
<b>🏢 Program Apresiasi Penulis</b>
─────────────────────

<b>👤 Data Diri</b>
• Nama Lengkap  : ${data.nama || "-"}
• WhatsApp      : <a href="https://wa.me/${formatWhatsApp(data.whatsapp)}">${data.whatsapp}</a>
• Email         : ${data.email || "-"}

<b>📖 Data Buku</b>
• Judul Buku      : ${data.judulBuku || "-"}
• Kategori        : ${data.kategoriBuku || "-"}
• Jenis Terbitan  : ${data.jenisTerbitan || "-"}
• Status Naskah   : ${statusLabel[data.statusNaskah] || data.statusNaskah || "-"}

<b>🆔 Informasi Pendaftaran</b>
• No. Registrasi : <b>${regNumber}</b>
• Tanggal        : ${dateStr}
• Jam            : ${timeStr}${folderSection}
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
      jenisTerbitan: (formData.get("jenisTerbitan") as string) || "",
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
    const fileBuktiFollow = formData.get("fileBuktiFollow") as File | null
    const fileBuktiFollowFounder = formData.get(
      "fileBuktiFollowFounder"
    ) as File | null

    const save = (f: File | null, dir: string) =>
      f instanceof File ? saveFile(f, dir) : Promise.resolve(null)

    const [naskahUrl, buktiUrl, buktiFounderUrl] = await Promise.all(
      [
        save(fileNaskah, "campaign/naskah"),
        save(fileBuktiFollow, "campaign/bukti"),
        save(fileBuktiFollowFounder, "campaign/bukti"),
      ]
    )

    const id = Date.now()
    const year = new Date().getFullYear()
    const registrationNumber = `MCM-${year}-${String(id)
      .slice(-4)
      .padStart(4, "0")}`

    let folderUrl: string | undefined
    try {
      const googlePayload: GooglePayload = {
        registrationNumber,
        tanggal: new Date().toISOString(),
        nama: data.nama,
        whatsapp: data.whatsapp,
        email: data.email,
        provinsi: data.provinsi,
        kota: data.kota,
        alamat: data.alamat,
        judulKarya: data.judulBuku,
        jenisTerbitan: data.jenisTerbitan,
        kategori: data.kategoriBuku,
        bahasa: "Indonesia",
        statusNaskah: data.statusNaskah,
        targetTerbit: data.targetTerbit,
        deskripsi: data.deskripsiBuku,
        fileNaskahUrl: naskahUrl,
        fileBuktiFollowUrl: buktiUrl,
        fileBuktiFollowFounderUrl: buktiFounderUrl,
      }
      const googleResult = await sendToGoogleSheets(googlePayload)
      if (googleResult.success && googleResult.folderUrl) {
        folderUrl = googleResult.folderUrl
      }
    } catch (e) {
      console.error("Google integration error (non-blocking):", e)
    }

    const text = buildTelegramMessage(data, registrationNumber, folderUrl)
    const telegramTasks: Promise<void>[] = [
      sendTelegramMessage(text).catch((e) => console.error("Telegram msg fail:", e)),
    ]
    if (naskahUrl) {
      telegramTasks.push(
        sendTelegramDocument(naskahUrl, "📄 File Naskah").catch((e) => console.error("Telegram doc fail:", e))
      )
    }
    if (buktiUrl) {
      telegramTasks.push(
        sendTelegramPhoto(buktiUrl, "📸 Bukti Follow Instagram PT Mughis Cipta Media").catch((e) => console.error("Telegram bukti fail:", e))
      )
    }
    if (buktiFounderUrl) {
      telegramTasks.push(
        sendTelegramPhoto(buktiFounderUrl, "📸 Bukti Follow Instagram Founder @mhdaghisna_").catch((e) => console.error("Telegram bukti founder fail:", e))
      )
    }
    await Promise.all(telegramTasks)

    const payload = {
      id,
      registrationNumber,
      ...data,
      fileNaskahUrl: naskahUrl,
      fileBuktiFollowUrl: buktiUrl,
      fileBuktiFollowFounderUrl: buktiFounderUrl,
      folderUrl: folderUrl || null,
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
