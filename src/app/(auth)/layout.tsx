import Sidebar from "@/components/layout/sidebar"
import Header from "@/components/layout/header"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Header />

        <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
          {children}
        </main>

      </div>

    </div>
  )
}