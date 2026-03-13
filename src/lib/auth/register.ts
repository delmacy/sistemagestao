import { db, usersInAuth } from "@/db"
import { hashPassword } from "./password"

export async function registerUser(email: string, password: string) {
  const passwordHash = await hashPassword(password)

  const [user] = await db
    .insert(usersInAuth)
    .values({
      email,
      passwordHash,
    })
    .returning()

  return user
}