import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function BillNotFound() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 text-center">
      <span className="mb-8 text-8xl font-black text-muted-foreground/20">
        404
      </span>
      <span>This bill does not exist</span>

      <Button asChild variant="link" className="h-fit w-fit p-0">
        <Link href="/bill/new">Create a new bill</Link>
      </Button>
    </main>
  )
}
