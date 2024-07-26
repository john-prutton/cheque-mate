import "server-only"

import { authService } from "infra/auth"

import { cookies } from "next/headers"

import { AUTH_COOKIE_NAME } from "./constants"

export const getUser = () => {
  const sessionId = cookies().get(AUTH_COOKIE_NAME)?.value

  if (!sessionId) throw new Error("No session")

  return authService.validateSession(sessionId)
}
