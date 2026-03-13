import { relations } from "drizzle-orm/relations";
import { usersInAuth, accountsInAuth, sessionsInAuth, loginAttemptsInAuth, userRolesInAuth, rolesInAuth } from "./schema";

export const accountsInAuthRelations = relations(accountsInAuth, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [accountsInAuth.userId],
		references: [usersInAuth.id]
	}),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	accountsInAuths: many(accountsInAuth),
	sessionsInAuths: many(sessionsInAuth),
	loginAttemptsInAuths: many(loginAttemptsInAuth),
	userRolesInAuths: many(userRolesInAuth),
}));

export const sessionsInAuthRelations = relations(sessionsInAuth, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [sessionsInAuth.userId],
		references: [usersInAuth.id]
	}),
}));

export const loginAttemptsInAuthRelations = relations(loginAttemptsInAuth, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [loginAttemptsInAuth.userId],
		references: [usersInAuth.id]
	}),
}));

export const userRolesInAuthRelations = relations(userRolesInAuth, ({one}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [userRolesInAuth.userId],
		references: [usersInAuth.id]
	}),
	rolesInAuth: one(rolesInAuth, {
		fields: [userRolesInAuth.roleId],
		references: [rolesInAuth.id]
	}),
}));

export const rolesInAuthRelations = relations(rolesInAuth, ({many}) => ({
	userRolesInAuths: many(userRolesInAuth),
}));