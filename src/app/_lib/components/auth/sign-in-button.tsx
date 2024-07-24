import { Button } from "../ui/button"
import { handleSignIn } from "./actions"

export function SignInButton() {
  return (
    <form action={handleSignIn}>
      <Button>Sign In</Button>
    </form>
  )
}
