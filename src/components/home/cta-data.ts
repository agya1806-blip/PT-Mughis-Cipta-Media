export interface CtaData {
  headline: string
  subtitle: string
  primaryCta: {
    label: string
    href: string
    /** Future: change to wa://, tel://, or CRM link */
  }
  secondaryCta: {
    label: string
    href: string
  }
  features: string[]
}

export const ctaData: CtaData = {
  headline: "Siap Menerbitkan Buku Anda?",
  subtitle:
    "Wujudkan naskah Anda menjadi buku yang berkualitas bersama PT Mughis Cipta Media. Tim kami siap mendampingi setiap langkah proses penerbitan secara profesional.",
  primaryCta: {
    label: "Konsultasi Gratis",
    href: "/kontak",
  },
  secondaryCta: {
    label: "Lihat Layanan",
    href: "/layanan-penerbitan",
  },
  features: [
    "Konsultasi Gratis",
    "Pendampingan Profesional",
    "ISBN Resmi",
    "Cetak Berkualitas",
  ],
}
