import "server-only"

import { authService } from "infra/auth"

import { cookies } from "next/headers"

export const AUTH_COOKIE_NAME = "auth-session-id"
export const OAUTH_STATE_COOKIE_NAME = "oauth-state"
export const OAUTH_CODE_VERIFIER_COOKIE_NAME = "oauth-code-verifier"

export const getUser = () => {
  const sessionId = cookies().get(AUTH_COOKIE_NAME)?.value

  if (!sessionId) throw new Error("No session")

  return authService.validateSession(sessionId)
}
