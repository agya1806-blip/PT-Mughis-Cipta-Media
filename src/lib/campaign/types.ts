export type NaskahStatus = "belum_selesai" | "sedang_ditulis" | "sudah_selesai"

export interface CampaignFormData {
  nama: string
  whatsapp: string
  email: string
  provinsi: string
  kota: string
  alamat: string
  judulBuku: string
  kategoriBuku: string
  jenisTerbitan: string
  jumlahHalaman: string
  statusNaskah: NaskahStatus | ""
  targetTerbit: string
  deskripsiBuku: string
  fileNaskah: File | null
  fileBuktiFollow: File | null
  fileBuktiFollowFounder: File | null
  persetujuan: boolean
}

export interface CampaignSubmission {
  id: string
  registrationNumber: string
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
  fileNaskahUrl: string | null
  fileBuktiFollowUrl: string | null
  fileBuktiFollowFounderUrl: string | null
  createdAt: string
}

export interface FormErrors {
  [key: string]: string
}

export interface QuotaConfig {
  total: number
  registered: number
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
}

export interface WhyCard {
  icon: string
  title: string
  description: string
}

export interface FlowStep {
  number: number
  title: string
  description: string
}

export interface FAQItem {
  q: string
  a: string
}

export interface Requirement {
  label: string
  description?: string
}
