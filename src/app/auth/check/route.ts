import { NextResponse } from "next/server"

import { getUser } from "@/auth/get-user"

export async function GET() {
  try {
    await getUser()
    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json({}, { status: 401 })
  }
}
