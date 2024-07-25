import { authRepository } from "infra/db" // eslint-disable-line

import { Google } from "arctic"
import { Lucia } from "lucia"

export const lucia = new Lucia(
  {
    ...authRepository,

    getSessionAndUser: async (sessionId) => {
      const [session, user] = await authRepository.getSessionAndUser(sessionId)

      if (!session || !user) return [null, null]

      return [
        {
          attributes: {},
          expiresAt: session.expiresAt,
          id: session.id,
          userId: session.userId
        },
        { attributes: user, id: user.id }
      ]
    },

    getUserSessions: async (userId) => {
      return await authRepository
        .getUserSessions(userId)
        .then((sessions) =>
          sessions.map((session) => ({ ...session, attributes: {} }))
        )
    }
  },
  {
    sessionCookie: {
      expires: false,
      attributes: {
        secure: process.env.NODE_ENV === "production"
      }
    }
  }
)

export const googleAuth = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.BASE_URL + "/auth/callback"
)

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: User
  }
}
