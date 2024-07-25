import type { IAuthRepository } from "domain/repositories"

import { eq, lt } from "drizzle-orm"

import { db } from "../db"
import { sessionsTable, usersTable } from "../schema"

export const authRepository: IAuthRepository = {
  deleteExpiredSessions: async () => {
    await db
      .delete(sessionsTable)
      .where(lt(sessionsTable.expiresAt, new Date()))
  },

  deleteSession: async (id) => {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, id))
  },

  deleteUserSessions: async (userId) => {
    await db.delete(sessionsTable).where(eq(sessionsTable.userId, userId))
  },

  getSessionAndUser: async (sessionId) => {
    const [session] = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.id, sessionId))

    if (!session) return [null, null]

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session.userId))

    return [{ ...session, expiresAt: new Date(session.expiresAt) }, user]
  },

  getUserSessions: async (userId) => {
    const sessions = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.userId, userId))

    return sessions.map((session) => ({
      ...session,
      expiresAt: new Date(session.expiresAt),
      attributes: {}
    }))
  },

  updateSessionExpiration: async (id, expiresAt) => {
    await db
      .update(sessionsTable)
      .set({ expiresAt })
      .where(eq(sessionsTable.id, id))
  },

  setSession: async (session) => {
    await db.insert(sessionsTable).values(session)
  },

  getUserById: async (id) => {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))

    return user
  },

  createUser: async (user) => {
    await db.insert(usersTable).values(user)
  }
}
