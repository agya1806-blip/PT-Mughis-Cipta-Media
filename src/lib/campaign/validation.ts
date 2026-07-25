import type { FormErrors, CampaignFormData } from "./types"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^(\+62|62|0)8[1-9][0-9]{6,11}$/

export function validateForm(data: Partial<CampaignFormData>): FormErrors {
  const errors: FormErrors = {}

  if (!data.nama?.trim()) errors.nama = "Nama lengkap wajib diisi"
  if (!data.whatsapp?.trim()) {
    errors.whatsapp = "Nomor WhatsApp wajib diisi"
  } else if (!PHONE_RE.test(data.whatsapp.replace(/\s/g, ""))) {
    errors.whatsapp = "Format nomor WhatsApp tidak valid"
  }
  if (!data.email?.trim()) {
    errors.email = "Email wajib diisi"
  } else if (!EMAIL_RE.test(data.email)) {
    errors.email = "Format email tidak valid"
  }
  if (!data.provinsi?.trim()) errors.provinsi = "Provinsi wajib diisi"
  if (!data.kota?.trim()) errors.kota = "Kabupaten/Kota wajib diisi"
  if (!data.alamat?.trim()) errors.alamat = "Alamat wajib diisi"
  if (!data.judulBuku?.trim()) errors.judulBuku = "Judul buku wajib diisi"
  if (!data.kategoriBuku?.trim()) errors.kategoriBuku = "Kategori buku wajib diisi"
  if (!data.jumlahHalaman?.trim()) errors.jumlahHalaman = "Jumlah halaman wajib diisi"
  else if (isNaN(Number(data.jumlahHalaman)) || Number(data.jumlahHalaman) < 1) {
    errors.jumlahHalaman = "Jumlah halaman harus angka positif"
  }
  if (!data.statusNaskah) errors.statusNaskah = "Status naskah wajib dipilih"
  if (!data.deskripsiBuku?.trim()) errors.deskripsiBuku = "Deskripsi buku wajib diisi"
  if (!data.persetujuan) errors.persetujuan = "Anda harus menyetujui pernyataan di atas"

  return errors
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  if (digits.startsWith("0")) return "62" + digits.slice(1)
  if (digits.startsWith("62")) return digits
  return "62" + digits
}
