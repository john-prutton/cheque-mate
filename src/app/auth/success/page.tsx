"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LoginSuccessPage() {
  const { push } = useRouter()

  useEffect(() => {
    setTimeout(() => {
      push("/")
    }, 1000)
  })

  return (
    <div>
      <h1>Success!</h1>
      <p>You have successfully logged in.</p>
      <span>Redirecting...</span>
    </div>
  )
}
