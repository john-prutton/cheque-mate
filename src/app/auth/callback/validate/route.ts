import { handleSignInCallback } from "use-cases/auth"

import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import {
  AUTH_COOKIE_NAME,
  OAUTH_CODE_VERIFIER_COOKIE_NAME,
  OAUTH_STATE_COOKIE_NAME
} from "@/utils/auth"

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")
  const state = request.nextUrl.searchParams.get("state")

  const cookieStore = cookies()

  const storedState = cookieStore.get(OAUTH_STATE_COOKIE_NAME)?.value
  const storedCodeVerifier = cookieStore.get(
    OAUTH_CODE_VERIFIER_COOKIE_NAME
  )?.value

  const { sessionId } = await handleSignInCallback({
    code,
    state,
    storedCodeVerifier,
    storedState
  })

  cookieStore.delete(OAUTH_CODE_VERIFIER_COOKIE_NAME)
  cookieStore.delete(OAUTH_STATE_COOKIE_NAME)
  cookieStore.set({
    name: AUTH_COOKIE_NAME,
    value: sessionId,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge: 1_000_000
  })

  return NextResponse.json({}, { status: 200 })
}
