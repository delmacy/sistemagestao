import { NextResponse } from "next/server"

import { db, usersInAuth } from "@/db"
import { hashPassword } from "@/lib/auth/password"

export async function POST(req: Request) {
  const body = await req.json()

  const passwordHash = await hashPassword(body.password)

  await db.insert(usersInAuth).values({
    email: body.email,
    passwordHash,
  })

  return NextResponse.json({
    success: true,
  })
}