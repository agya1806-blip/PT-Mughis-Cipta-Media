import type { TeamFormErrors, TeamFormData } from "./types"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^(\+62|62|0)8[1-9][0-9]{6,11}$/

export function validateTeamForm(
  data: Partial<TeamFormData>,
  requirePassword = false
): TeamFormErrors {
  const errors: TeamFormErrors = {}

  if (!data.name?.trim()) errors.name = "Nama wajib diisi"
  if (!data.position?.trim()) errors.position = "Jabatan wajib diisi"
  if (!data.division?.trim()) errors.division = "Divisi wajib diisi"
  if (!data.bio?.trim()) errors.bio = "Bio wajib diisi"

  if (!data.email?.trim()) {
    errors.email = "Email wajib diisi"
  } else if (!EMAIL_RE.test(data.email)) {
    errors.email = "Format email tidak valid"
  }

  if (requirePassword && !data.password?.trim()) {
    errors.password = "Password wajib diisi"
  }

  if (data.whatsapp && !PHONE_RE.test(data.whatsapp.replace(/\s/g, ""))) {
    errors.whatsapp = "Format nomor WhatsApp tidak valid"
  }

  return errors
}
