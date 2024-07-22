"use client"

import Image from "next/image"
import { useRef, useState } from "react"

import {
  LucideImageUp,
  LucideLoader2,
  LucideMinus,
  LucidePlus
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { createNewBill } from "./action"

import "./style.css"

export function NewBillForm() {
  const [pictures, setPictures] = useState<string[]>([])
  const [numberOfPeople, setNumberOfPeople] = useState<number | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const [pending, setPending] = useState(false)

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

    setPictures((pictures) => [...pictures, ...base64Images])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!numberOfPeople || numberOfPeople < 2 || pictures.length === 0) {
      return
    }

    setPending(true)

    try {
      alert(
        JSON.stringify(
          await createNewBill({
            numberOfPeople,
            images: pictures
          })
        )
      )
    } catch (error) {
      alert("An error occurred while processing the bill.")
      console.error(error)
    }

    setPending(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="labeled-input">
        <Input
          placeholder=" "
          required
          type="number"
          value={numberOfPeople ?? ""}
          onChange={(e) => setNumberOfPeople(+e.target.value)}
        />
        <label className="pointer-events-none touch-none">
          Number of people
        </label>
      </div>

      <div className="mt-8">
        <div className="flex flex-row -space-x-44">
          {pictures.length === 0 ? (
            <LucideImageUp className="mx-auto aspect-square size-64 stroke-1" />
          ) : (
            pictures
              .toReversed()
              .map((picture, index, arr) => (
                <Image
                  src={picture}
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
          ref={imageInputRef}
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <div className="flex flex-row">
          <Button
            type="button"
            variant="ghost"
            disabled={pictures.length === 0}
            className="mt-8 w-full text-red-500 disabled:text-red-500/30"
            onClick={() => {
              setPictures((pictures) => pictures.slice(0, -1))
            }}
          >
            <LucideMinus className="mr-2" />
            Remove
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="mt-8 w-full text-primary"
            onClick={() => {
              imageInputRef.current?.click()
            }}
          >
            <LucidePlus className="mr-2" />
            Add pictures
          </Button>
        </div>
      </div>
      <Button
        className="mt-16 w-full disabled:bg-primary/20 disabled:text-foreground"
        disabled={
          pictures.length === 0 ||
          !numberOfPeople ||
          numberOfPeople < 2 ||
          pending
        }
        type="submit"
      >
        Next
        {pending && <LucideLoader2 className="ml-2 animate-spin" />}
      </Button>
    </form>
  )
}
