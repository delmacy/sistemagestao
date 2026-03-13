import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth

  const pathname = req.nextUrl.pathname

  const protectedRoutes = [
    "/dashboard",
    "/technicians",
    "/admin",
  ]

  const adminRoutes = [
    "/admin",
  ]

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  const isAdminRoute = adminRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // 🔒 usuário não logado
  if (!isLoggedIn && isProtected) {
    return NextResponse.redirect(
      new URL("/login", req.nextUrl.origin)
    )
  }

  // 🔒 rota admin
    if (
    pathname.startsWith("/admin") &&
    req.auth?.user?.role !== "admin"
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", req.nextUrl.origin)
    )
  }

  // 🔁 impedir voltar para login logado
  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(
      new URL("/dashboard", req.nextUrl.origin)
    )
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/technicians/:path*",
    "/admin/:path*",
    "/login",
  ],
}