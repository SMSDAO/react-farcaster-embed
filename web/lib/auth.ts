import { SignJWT, jwtVerify } from 'jose'

/**
 * Returns the JWT signing secret. Called lazily at request time so that
 * missing env vars cause a runtime error (not a build-time crash).
 * Exported so proxy.ts can reuse the same implementation.
 */
export function getSecret(): Uint8Array {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('NEXTAUTH_SECRET environment variable is required in production')
    }
    // Development-only fallback — NOT for production use
    return new TextEncoder().encode('neo-flash-glow-dev-secret-change-this')
  }
  return new TextEncoder().encode(secret)
}

export type UserRole = 'admin' | 'user' | 'developer'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
}

// In production, set ADMIN_EMAIL / ADMIN_PASSWORD env vars to supply real credentials.
// In development the demo defaults below are used as a convenience.
// DEMO ONLY: passwords stored in plain text. Replace with bcrypt/argon2 + a database in production.
const isDev = process.env.NODE_ENV !== 'production'
const adminEmail = (process.env.ADMIN_EMAIL?.trim()) || (isDev ? 'admin@admin.com' : undefined)
const adminPassword = (process.env.ADMIN_PASSWORD?.trim()) || (isDev ? 'admin123' : undefined)
const hasAdminCredentials = Boolean(adminEmail && adminPassword)

export const users: User[] = hasAdminCredentials
  ? [{ id: '1', email: adminEmail!, name: 'Admin', role: 'admin', avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=admin` }]
  : []

export const passwords: Record<string, string> = hasAdminCredentials
  ? { [adminEmail!]: adminPassword! }
  : {}

export async function createToken(user: User): Promise<string> {
  return new SignJWT({ id: user.id, email: user.email, role: user.role, name: user.name })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(getSecret())
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as unknown as User
  } catch {
    return null
  }
}

export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  const hierarchy: Record<UserRole, number> = { admin: 3, developer: 2, user: 1 }
  return hierarchy[userRole] >= hierarchy[requiredRole]
}
