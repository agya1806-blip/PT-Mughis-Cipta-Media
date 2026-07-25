import type { TeamMember } from "@/lib/__generated__/prisma/client"

export function toPublicMember(member: TeamMember) {
  return {
    id: member.id,
    name: member.name,
    position: member.position,
    division: member.division,
    role: member.role,
    bio: member.bio,
    photo: member.photo,
    email: member.email,
    whatsapp: member.whatsapp,
    linkedin: member.linkedin,
    facebook: member.facebook,
    instagram: member.instagram,
    website: member.website,
    skills: member.skills,
    quote: member.quote,
    displayOrder: member.displayOrder,
  }
}

export function toProfileMember(member: TeamMember) {
  return {
    id: member.id,
    name: member.name,
    position: member.position,
    division: member.division,
    role: member.role,
    bio: member.bio,
    photo: member.photo,
    email: member.email,
    whatsapp: member.whatsapp,
    linkedin: member.linkedin,
    facebook: member.facebook,
    instagram: member.instagram,
    website: member.website,
    skills: member.skills,
    quote: member.quote,
  }
}

export function getAllowedEdits(role: string): string[] {
  const base = [
    "bio",
    "photo",
    "skills",
    "whatsapp",
    "email",
    "linkedin",
    "facebook",
    "instagram",
    "website",
    "quote",
  ]
  if (role === "FOUNDER") {
    return [
      ...base,
      "name",
      "position",
      "division",
      "role",
      "status",
      "displayOrder",
      "password",
    ]
  }
  return base
}
