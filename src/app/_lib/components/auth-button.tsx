import { handleSignIn, handleSignOut } from "@/auth/actions"
import { getUser } from "@/auth/get-user"

import { Button } from "./ui/button"

const checkAuthStatus = async () => {
  try {
    await getUser()
    return true
  } catch {
    return false
  }
}

export const AuthButton = async ({
  className,
  containerClassName
}: {
  className?: string
  containerClassName?: string
}) => {
  const isAuthenticated = await checkAuthStatus()

  return (
    <form
      action={isAuthenticated ? handleSignOut : handleSignIn}
      className={containerClassName}
    >
      <Button
        className={className}
        variant={isAuthenticated ? "secondary" : "default"}
      >
        {isAuthenticated ? "Sign Out" : "Sign In"}
      </Button>
    </form>
  )
}
