"use client"

import Image from "next/image"
import { useRef, useState } from "react"

import { LucideImageUp, LucideMinus, LucidePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { createNewBill } from "./action"

import "./style.css"

export function NewBillForm() {
  const [pictures, setPictures] = useState<{ base64: string; file: File }[]>([])
  const [numberOfPeople, setNumberOfPeople] = useState<number | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (!numberOfPeople || numberOfPeople < 2 || pictures.length === 0) {
      return
    }

    createNewBill({
      numberOfPeople,
      images: pictures.map((picture) => picture.file)
    })
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
                  src={picture.base64}
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
          onChange={(event) => {
            const files = event.target.files
            if (files) {
              const urls = Array.from(files).map((file) => ({
                base64: URL.createObjectURL(file),
                file
              }))
              setPictures((pictures) => [...pictures, ...urls])
            }
          }}
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
          pictures.length === 0 || !numberOfPeople || numberOfPeople < 2
        }
      >
        Next
      </Button>
    </form>
  )
}
