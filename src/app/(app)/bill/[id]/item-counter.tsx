"use client"

import { startTransition, useOptimistic } from "react"

import { LucideMinus, LucidePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"

type Props = {
  available: number
  user: number
  updateCount: (newQuant: number) => Promise<void>
}

export const ItemCounter: React.FC<Props> = ({
  available,
  user,
  updateCount
}) => {
  const [userQuantity, setUserQuantity] = useOptimistic(user)

  const handleUpdate = async (newUserQuantity: number) =>
    startTransition(() => {
      if (newUserQuantity < 0) {
        return
      }

      if (newUserQuantity > available) {
        return
      }

      setUserQuantity(newUserQuantity)
      updateCount(newUserQuantity)
    })

  return (
    <div className="flex flex-row items-center justify-center gap-1 text-muted-foreground">
      <Button
        onClick={() => handleUpdate(userQuantity - 1)}
        variant="ghost"
        size="icon"
      >
        <LucideMinus />
      </Button>

      <div
        className={cn(
          "w-[5ch] text-center font-bold",
          userQuantity !== 0 && "text-primary"
        )}
      >
        {userQuantity}
      </div>

      <Button
        onClick={() => handleUpdate(userQuantity + 1)}
        variant="ghost"
        size="icon"
      >
        <LucidePlus />
      </Button>
    </div>
  )
}
