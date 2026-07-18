import { NextRequest } from "next/server"
import { getBooks } from "@/lib/books"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const page = parseInt(searchParams.get("page") ?? "1", 10)
  const limit = parseInt(searchParams.get("limit") ?? "12", 10)
  const category_id = searchParams.get("category_id") ?? undefined
  const search = searchParams.get("search") ?? undefined
  const sort = (searchParams.get("sort") ?? "latest") as "latest" | "price_asc" | "price_desc"

  const result = getBooks({ page, limit, category_id, search, sort })

  return Response.json(result)
}
