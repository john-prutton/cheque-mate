import { cookies } from "next/headers"
import Link from "next/link"

import { handleSignIn } from "@/auth/actions"
import { AUTH_REDIRECT_COOKIE_NAME } from "@/auth/constants"
import { Button } from "@/components/ui/button"

export default function LoginPage({
  searchParams: { redirectURL }
}: {
  searchParams: { redirectURL?: string }
}) {
  const wrappedHandleSignIn = async () => {
    "use server"
    cookies().set(AUTH_REDIRECT_COOKIE_NAME, redirectURL ?? "/")
    return await handleSignIn()
  }

  return (
    <main className="grid h-svh place-content-center">
      <h1 className="mb-8 text-3xl font-black">Authentication Required</h1>

      <p className="mb-4">Please login to access this resource</p>

      <div className="flex flex-row gap-4">
        <Button variant={"secondary"} asChild className="w-full">
          <Link href="/">Back to home</Link>
        </Button>

        <form action={wrappedHandleSignIn} className="w-full">
          <Button className="w-full">Sign in</Button>
        </form>
      </div>
    </main>
  )
}
