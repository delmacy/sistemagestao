import { db, usersInAuth } from "@/db"
import { eq } from "drizzle-orm"
import { verifyPassword } from "./password"

export async function loginUser(email: string, password: string) {

  // 🔹 fallback de desenvolvimento
  if (
    email === process.env.DEV_LOGIN_EMAIL &&
    password === process.env.DEV_LOGIN_PASSWORD
  ) {
    console.log("LOGIN DEV OK")

    return {
      id: "dev-user",
      email: process.env.DEV_LOGIN_EMAIL,
    }
  }

  const user = await db.query.usersInAuth.findFirst({
    where: eq(usersInAuth.email, email),
  })

  if (!user) {
    console.log("Usuário não encontrado")
    return null
  }

  if (user.disabledAt) {
    console.log("Usuário desativado")
    return null
  }

  const valid = await verifyPassword(password, user.passwordHash)

  if (!valid) {
    console.log("Senha inválida")
    return null
  }

  return user
}