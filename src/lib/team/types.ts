export type TeamRole = "FOUNDER" | "GENERAL_MANAGER" | "HEAD_OF_DIVISION"
export type TeamMemberStatus = "ACTIVE" | "INACTIVE"

export interface TeamMemberData {
  id: number
  name: string
  position: string
  division: string
  role: TeamRole
  bio: string
  photo: string | null
  email: string
  whatsapp: string | null
  linkedin: string | null
  facebook: string | null
  instagram: string | null
  website: string | null
  skills: string | null
  quote: string | null
  status: TeamMemberStatus
  displayOrder: number
  createdAt: string
  updatedAt: string
}

export interface TeamMemberPublic {
  id: number
  name: string
  position: string
  division: string
  role: TeamRole
  bio: string
  photo: string | null
  email: string
  whatsapp: string | null
  linkedin: string | null
  facebook: string | null
  instagram: string | null
  website: string | null
  skills: string | null
  quote: string | null
  displayOrder: number
}

export interface TeamMemberProfile {
  id: number
  name: string
  position: string
  division: string
  role: TeamRole
  bio: string
  photo: string | null
  email: string
  whatsapp: string | null
  linkedin: string | null
  facebook: string | null
  instagram: string | null
  website: string | null
  skills: string | null
  quote: string | null
}

export interface TeamFormData {
  name: string
  position: string
  division: string
  bio: string
  photo: string | null
  email: string
  password?: string
  whatsapp: string
  linkedin: string
  facebook: string
  instagram: string
  website: string
  skills: string
  quote: string
}

export interface TeamFormErrors {
  [key: string]: string
}
