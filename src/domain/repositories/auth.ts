export type IAuthRepository = {
  deleteExpiredSessions: () => Promise<void>

  deleteSession: (sessionId: Session["id"]) => Promise<void>

  deleteUserSessions: (userId: User["id"]) => Promise<void>

  getSessionAndUser: (
    sessionId: Session["id"]
  ) => Promise<[Session | null, User | null]>

  getUserSessions: (userId: User["id"]) => Promise<Session[]>

  setSession: (session: Session) => Promise<void>

  updateSessionExpiration: (
    id: Session["id"],
    expiresAt: Session["expiresAt"]
  ) => Promise<void>

  getUserById: (id: User["id"]) => Promise<User | null>

  createUser: (user: User) => Promise<void>
}
