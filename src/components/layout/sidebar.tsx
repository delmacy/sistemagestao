"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  const item = (href: string, label: string) => {
    const active = pathname.startsWith(href)

    return (
      <Link
        href={href}
        className={`block rounded-lg px-3 py-2 text-sm transition
        ${active
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted"
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <aside className="w-64 border-r bg-background">
      <div className="p-6 font-semibold text-lg">
        Sistema
      </div>

      <nav className="space-y-2 px-4">

        {item("/dashboard", "Dashboard")}
        {item("/orders", "Ordens")}
        {item("/technicians", "Técnicos")}

      </nav>
    </aside>
  )
}