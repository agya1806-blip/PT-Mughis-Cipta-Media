export type ManuscriptStatus =
  | "draft"
  | "submitted"
  | "review"
  | "editing"
  | "layout"
  | "printing"
  | "published"

export interface Manuscript {
  id: string
  title: string
  category: string
  synopsis: string
  author: string
  status: ManuscriptStatus
  createdAt: string
  updatedAt: string
  coverImage?: string
  notes?: string
}

export interface Activity {
  id: string
  action: string
  description: string
  timestamp: string
  type: "system" | "editor" | "publishing" | "general"
}

export interface Notification {
  id: string
  title: string
  message: string
  category: "system" | "editor" | "publishing" | "general"
  read: boolean
  createdAt: string
}

export interface DashboardStats {
  totalManuscripts: number
  underReview: number
  inProgress: number
  published: number
}

export interface AuthorProfile {
  name: string
  email: string
  phone: string
  address: string
  bio: string
  avatar?: string
  memberSince: string
}
