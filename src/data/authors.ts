export interface Author {
  id: string
  name: string
  slug: string
  photo: string | null
  bio: string
  field: string
  social: {
    instagram?: string
    facebook?: string
    twitter?: string
    website?: string
  }
  bookIds: string[]
}
