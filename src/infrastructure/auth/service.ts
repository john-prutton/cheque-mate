import { IAuthService } from "domain/services/auth"
import { authRepository } from "infra/db" // eslint-disable-line

import { generateCodeVerifier, generateState } from "arctic"

import { googleAuth, lucia } from "./lucia"

type GoogleUserData = {
  sub: string // Google user ID
  name: string
  email: string
}

export const authService: IAuthService = {
  createAuthorisationObject: async () => {
    const state = generateState()
    const codeVerifier = generateCodeVerifier()
    const url = await googleAuth
      .createAuthorizationURL(state, codeVerifier, {
        scopes: ["profile", "email"]
      })
      .then((url) => url.toString())

    return {
      url,
      state,
      codeVerifier
    }
  },

  handleSignInCallback: async ({
    code,
    state,
    storedCodeVerifier,
    storedState
  }) => {
    if (
      !code ||
      !state ||
      !storedState ||
      !storedCodeVerifier ||
      state !== storedState
    )
      throw new Error("Invalid state")

    try {
      const tokens = await googleAuth.validateAuthorizationCode(
        code,
        storedCodeVerifier
      )

      const userData = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`
          }
        }
      ).then<GoogleUserData>((res) => res.json())

      let user: User | null

      user = await authRepository.getUserById(userData.sub)
      if (!user) {
        user = {
          id: userData.sub,
          email: userData.email,
          name: userData.name
        }

        await authRepository.createUser(user)
      }

      const session = await lucia.createSession(user.id, {})
      return { sessionId: session.id }
    } catch (error) {
      console.error(error)
      throw new Error("Failed to authenticate")
    }
  },

  handleSignOut: async (sessionId) => {
    await lucia.invalidateSession(sessionId)
  },

  validateSession: async (sessionId) => {
    const [session, user] = await authRepository.getSessionAndUser(sessionId)

    if (!session || !user) throw new Error("Invalid session")

    return user
  }
}
