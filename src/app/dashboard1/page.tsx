import { auth } from "@/auth"

export default async function Dashboard() {
  const session = await auth()

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Usuário: {session?.user?.email}</p>
    </div>
  )
}