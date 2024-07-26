"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { LucideCheck, LucideLoader2, LucideX } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AuthCallbackPage({
  searchParams: { code, state }
}: {
  searchParams: { state?: string; code?: string }
}) {
  const hasRunRef = useRef(false)
  const { push } = useRouter()
  const [status, setStatus] = useState<"Authenticating" | "Error" | "Success">(
    "Authenticating"
  )

  const handleSignInCallback = async () => {
    const res = await fetch(
      `/auth/callback/validate?code=${code}&state=${state}`
    )

    if (!res.ok) {
      setStatus("Error")
    } else {
      setStatus("Success")
      const redirectURL = await res.json().then((data) => data.redirectURL)

      setTimeout(() => push(redirectURL ?? "/"), 2000)
    }
  }

  useEffect(() => {
    if (!hasRunRef.current) {
      hasRunRef.current = true
      handleSignInCallback()
    }
  }, [])

  return (
    <main className="grid h-svh place-content-center bg-background">
      <div className="flex flex-row flex-wrap items-center justify-center gap-8 rounded bg-muted p-4">
        <span className="text-2xl font-bold">{status}</span>

        {status === "Authenticating" && (
          <LucideLoader2 className="size-16 animate-[spin_2s_linear_infinite] text-primary" />
        )}

        {status === "Success" && (
          <>
            <LucideCheck className="size-16 text-primary" />
            <span className="basis-full text-center">
              Redirecting in 2 seconds...
            </span>
          </>
        )}
        {status === "Error" && (
          <>
            <LucideX className="size-16 text-red-500" />
            <div className="basis-full">
              <Button
                variant="link"
                asChild
                className="mx-auto block size-fit p-0"
              >
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
