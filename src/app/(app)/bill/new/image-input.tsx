"use client"

import Image from "next/image"
import { useRef, useState } from "react"

import {
  LucideImageUp,
  LucideLoader2,
  LucideMinus,
  LucidePlus
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { handleAnalyzeReceipt } from "./actions"
import { useReceipt } from "./store"

export const ImageInput = () => {
  const ref = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<string[]>([])
  const [pending, setPending] = useState(false)

  const { setItems } = useReceipt()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setPending(true)

    try {
      const { items } = await handleAnalyzeReceipt({
        images
      })

      setItems(items)
    } catch (error) {
      toast.error("Something went wrong", {
        description: "An error occurred while processing the bill."
      })
      console.error(error)
    }

    setPending(false)
  }

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (!files) return

    const base64Images = await Promise.all(
      Array.from(files).map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.readAsDataURL(file)
          })
      )
    )

    setImages((images) => [...images, ...base64Images])
  }

  return (
    <div className="rounded border bg-muted/20 px-2 py-4">
      <h2 className="text-lg font-bold leading-4">
        Extract items from receipt
      </h2>

      {images.length === 0 ? (
        <LucideImageUp className="mx-auto aspect-square size-64 stroke-1 opacity-50" />
      ) : (
        <div className="mx-auto flex w-fit flex-row -space-x-44">
          {images.toReversed().map((image, index, arr) => (
            <Image
              src={image}
              key={index}
              alt={`Image ${index} of the bill`}
              style={{ zIndex: arr.length - index }}
              sizes="256px"
              fill
              className="!relative inline !size-64 rounded-lg border-4 border-muted object-cover shadow-2xl"
            />
          ))}
        </div>
      )}

      <input
        ref={ref}
        type="file"
        accept="image/*"
        hidden
        multiple
        onChange={handleImageChange}
      />

      <div className="flex flex-row">
        <Button
          type="button"
          variant="ghost"
          disabled={images.length === 0}
          className="mt-8 w-full text-red-500 hover:text-red-500 disabled:text-red-500/30"
          onClick={() => {
            setImages((images) => images.slice(0, -1))
          }}
        >
          <LucideMinus className="mr-2" />
          Remove
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="mt-8 w-full text-primary hover:text-primary"
          onClick={() => ref.current?.click()}
        >
          <LucidePlus className="mr-2" />
          Add images
        </Button>
      </div>

      <Button
        className="mt-16 w-full disabled:bg-primary/20 disabled:text-foreground"
        disabled={images.length === 0 || pending}
        onClick={handleSubmit}
      >
        Next
        {pending && <LucideLoader2 className="ml-2 animate-spin" />}
      </Button>
    </div>
  )
}
