"use client"

import { useState } from "react"

import { LucideMinus, LucidePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"

type Props = {
  available: number
}

export const ItemCounter: React.FC<Props> = ({ available }) => {
  const [count, setCount] = useState(0)

  const handleDecrement = () => setCount((count) => Math.max(0, count - 1))
  const handleIncrement = () =>
    setCount((count) => Math.min(available, count + 1))

  return (
    <div className="flex flex-row items-center justify-center gap-1 text-muted-foreground">
      <Button onClick={handleDecrement} variant="ghost" size="icon">
        <LucideMinus />
      </Button>

      <div
        className={cn(
          "w-[5ch] text-center font-bold",
          count !== 0 && "text-primary"
        )}
      >
        {count}
      </div>

      <Button onClick={handleIncrement} variant="ghost" size="icon">
        <LucidePlus />
      </Button>
    </div>
  )
}
