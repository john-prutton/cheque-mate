import { getUser } from "@/utils/auth"

import { Button } from "../ui/button"
import { handleSignIn, handleSignOut } from "./actions"

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
