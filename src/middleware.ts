import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { AUTH_COOKIE_NAME } from "@/utils/auth/constants"

export async function middleware(request: NextRequest) {
  const isAuthenticated = await new Promise<boolean>(async (resolve) => {
    const sessionId = request.cookies.get(AUTH_COOKIE_NAME)?.value
    if (!sessionId) resolve(false)

    const res = await fetch(process.env.BASE_URL! + "/auth/check", {
      headers: { cookie: `${AUTH_COOKIE_NAME}=${sessionId}` }
    })

    resolve(res.ok)
  })

  console.log("isAuthenticated", isAuthenticated)
  if (!isAuthenticated)
    return NextResponse.redirect(process.env.BASE_URL + "/auth/login")
}

export const config = {
  matcher: ["/bill/:path*", "/new/:path*"]
}
