export interface GooglePayload {
  registrationNumber: string
  tanggal: string
  nama: string
  whatsapp: string
  email: string
  provinsi: string
  kota: string
  alamat: string
  judulKarya: string
  jenisTerbitan: string
  kategori: string
  bahasa: string
  statusNaskah: string
  targetTerbit: string
  deskripsi: string
  fileNaskahUrl: string | null
  fileBuktiFollowUrl: string | null
  fileBuktiFollowFounderUrl: string | null
}

export interface GoogleResult {
  success: boolean
  folderUrl?: string
  error?: string
}

export async function sendToGoogleSheets(payload: GooglePayload): Promise<GoogleResult> {
  const url = process.env.APPS_SCRIPT_URL
  if (!url) {
    console.warn("APPS_SCRIPT_URL not configured — skipping Google Sheets & Drive")
    return { success: false, error: "APPS_SCRIPT_URL not configured" }
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30000),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Google Apps Script error (${res.status}): ${text.slice(0, 500)}`)
  }

  return res.json()
}
