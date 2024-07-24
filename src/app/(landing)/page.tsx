import Link from "next/link"

import { SignInButton } from "@/components/auth/sign-in-button"
import { Button } from "@/components/ui/button"

import style from "./style.module.css"

export default function Home() {
  return (
    <main className={style["radial-bg"]}>
      <div className="w-fit max-w-md">
        <span className="text-5xl font-black">ChequeMate</span>

        <h1 className="mt-8 text-xl tracking-wide">
          Take a picture of your bill and split it among friends!
        </h1>

        <Button asChild className={style["animate-small-ping"]}>
          <Link href="/new">Get Started</Link>
        </Button>

        <SignInButton />
      </div>
    </main>
  )
}
