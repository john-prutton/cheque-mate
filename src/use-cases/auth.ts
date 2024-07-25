import { authService } from "infra/auth/service"

export const signIn = authService.createAuthorisationObject

export const handleSignInCallback = authService.handleSignInCallback

export const signOut = authService.handleSignOut
