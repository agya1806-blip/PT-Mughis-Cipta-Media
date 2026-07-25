import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const teamToken = request.cookies.get("team_token")?.value
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
    try {
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      )
      if (payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (pathname.startsWith("/team/profile")) {
    if (!teamToken) {
      return NextResponse.redirect(new URL("/team/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/team/profile/:path*"],
}
