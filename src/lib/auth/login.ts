import { db, usersInAuth } from "@/db"
import { verifyPassword } from "./password"
import { eq } from "drizzle-orm"

export async function loginUser(email: string, password: string) {
  const user = await db.query.usersInAuth.findFirst({
    where: eq(usersInAuth.email, email),
  })

  if (!user) return null

  const valid = await verifyPassword(password, user.passwordHash)

  if (!valid) return null

  return user
}