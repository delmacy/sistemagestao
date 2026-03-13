import CreateUserForm from "@/components/create-user-form"

export default function NewUserPage() {
  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-semibold mb-6">
        Criar usuário
      </h1>

      <CreateUserForm />
    </div>
  )
}