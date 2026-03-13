import { db, userRolesInAuth, rolesInAuth } from "@/db"
import { eq } from "drizzle-orm"

export async function getUserRoles(userId: string) {
  const result = await db
    .select({
      role: rolesInAuth.name,
    })
    .from(userRolesInAuth)
    .innerJoin(rolesInAuth, eq(userRolesInAuth.roleId, rolesInAuth.id))
    .where(eq(userRolesInAuth.userId, userId))

  return result.map((r) => r.role)
}

export async function hasRole(userId: string, role: string) {
  const roles = await getUserRoles(userId)

  return roles.includes(role)
}