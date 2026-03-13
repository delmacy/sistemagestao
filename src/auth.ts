import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

import { db } from "@/db"
import { loginUser } from "@/lib/auth/login"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),

  session: {
    strategy: "database",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await loginUser(
          credentials.email as string,
          credentials.password as string
        )

        if (!user) return null

        return {
          id: user.id,
          email: user.email,
        }
      },
    }),
  ],
})