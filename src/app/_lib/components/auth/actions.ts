"use server"

import { signIn, signOut } from "use-cases/auth"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import {
  AUTH_COOKIE_NAME,
  OAUTH_CODE_VERIFIER_COOKIE_NAME,
  OAUTH_STATE_COOKIE_NAME
} from "@/utils/auth"

const setCookie = (cookie: Cookie) =>
  cookies().set({
    ...cookie,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 600,
    sameSite: "lax"
  })

export const handleSignIn = async () => {
  const { url, state, codeVerifier } = await signIn()

  setCookie({ name: OAUTH_STATE_COOKIE_NAME, value: state })
  setCookie({ name: OAUTH_CODE_VERIFIER_COOKIE_NAME, value: codeVerifier })

  redirect(url)
}

export const handleSignOut = async () => {
  const sessionId = cookies().get(AUTH_COOKIE_NAME)?.value

  if (sessionId) {
    await signOut(sessionId)
    cookies().delete(AUTH_COOKIE_NAME)
  }

  redirect("/")
}
