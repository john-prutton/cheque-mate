export type IAuthService = {
  createAuthorisationObject: () => Promise<{
    url: string
    state: string
    codeVerifier: string
  }>

  handleSignInCallback: (params: {
    code: string | null
    state: string | null
    storedCodeVerifier: string | undefined
    storedState: string | undefined
  }) => Promise<{ sessionId: string }>

  handleSignOut: (sessionId: Session["id"]) => Promise<void>

  validateSession: (sessionId: Session["id"]) => Promise<User>
}
