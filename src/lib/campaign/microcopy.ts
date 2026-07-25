import type { CampaignPeriod } from "./settings"

export interface Microcopy {
  badge: string
  countdownPrefix: string
  buttonText: string
  buttonDisabled: boolean
  microcopy: string
}

const COPY: Record<CampaignPeriod, Microcopy> & { manualOff: Microcopy } = {
  before: {
    badge: "Belum Dimulai",
    countdownPrefix: "Pendaftaran dibuka dalam",
    buttonText: "PENDAFTARAN BELUM DIBUKA",
    buttonDisabled: true,
    microcopy:
      "Program Apresiasi Penulis belum dimulai. Pantau terus website ini untuk informasi pendaftaran.",
  },
  during: {
    badge: "Sedang Berlangsung",
    countdownPrefix: "Program berakhir dalam",
    buttonText: "DAFTAR SEKARANG",
    buttonDisabled: false,
    microcopy:
      "Segera daftarkan karya terbaik Anda dan dapatkan pendampingan administrasi penerbitan secara GRATIS.",
  },
  after: {
    badge: "Telah Ditutup",
    countdownPrefix: "Program telah berakhir",
    buttonText: "PENDAFTARAN TELAH DITUTUP",
    buttonDisabled: true,
    microcopy:
      "Program Apresiasi Penulis telah ditutup. Ikuti media sosial kami untuk informasi program selanjutnya.",
  },
  manualOff: {
    badge: "Ditutup",
    countdownPrefix: "Pendaftaran sementara ditutup",
    buttonText: "PENDAFTARAN DITUTUP",
    buttonDisabled: true,
    microcopy:
      "Pendaftaran program untuk sementara ditutup. Silakan hubungi admin untuk informasi lebih lanjut.",
  },
}

export function getMicrocopy(
  status: CampaignPeriod,
  active: boolean
): Microcopy {
  if (!active && status === "during") return COPY.manualOff
  return COPY[status]
}
