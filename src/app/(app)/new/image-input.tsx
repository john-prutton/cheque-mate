"use client"

import Image from "next/image"
import { Dispatch, SetStateAction, useRef } from "react"

import { LucideImageUp, LucideMinus, LucidePlus } from "lucide-react"

import { Button } from "@/app/_components/ui/button"

type Props = {
  images: string[]
  setImages: Dispatch<SetStateAction<string[]>>
}

export const ImageInput = ({ images, setImages }: Props) => {
  const ref = useRef<HTMLInputElement>(null)

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
    <div>
      <div className="flex flex-row -space-x-44">
        {images.length === 0 ? (
          <LucideImageUp className="mx-auto aspect-square size-64 stroke-1 opacity-50" />
        ) : (
          images
            .toReversed()
            .map((image, index, arr) => (
              <Image
                src={image}
                key={index}
                alt={`Image ${index} of the bill`}
                style={{ zIndex: arr.length - index }}
                sizes="256px"
                fill
                className="!relative inline !size-64 rounded-lg border-4 border-muted object-cover shadow-2xl"
              />
            ))
        )}
      </div>

      <input
        ref={ref}
        className="hidden"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />

      <div className="flex flex-row">
        <Button
          type="button"
          variant="ghost"
          disabled={images.length === 0}
          className="mt-8 w-full text-red-500 disabled:text-red-500/30"
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
          className="mt-8 w-full text-primary"
          onClick={() => ref.current?.click()}
        >
          <LucidePlus className="mr-2" />
          Add images
        </Button>
      </div>
    </div>
  )
}
