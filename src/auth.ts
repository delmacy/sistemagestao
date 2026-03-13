import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const { loginUser } = await import("@/lib/auth/login")

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

  session: {
    strategy: "jwt",   // 👈 ESSENCIAL
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
  async jwt({ token, user }) {

    if (user) {
      token.email = user.email
    }

    return token
  },

  async session({ session, token }) {
    session.user.email = token.email as string
    return session
  }
  },


})