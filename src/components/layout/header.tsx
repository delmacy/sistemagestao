import { getSessionUser } from "@/lib/auth/sessions"

export default async function Header() {
  const user = await getSessionUser()

  return (
    <header className="border-b bg-background px-6 py-3">
      <div className="flex items-center justify-between">

        <div className="font-semibold">
          Painel
        </div>

        <div className="text-sm text-muted-foreground">
          {user?.email}
        </div>

      </div>
    </header>
  )
}