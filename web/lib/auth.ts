import { SignJWT, jwtVerify } from 'jose'

/**
 * Returns the JWT signing secret. Called lazily at request time so that
 * missing env vars cause a runtime error (not a build-time crash).
 */
function getSecret(): Uint8Array {
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

// In-memory user store — DEMO ONLY. Replace with a database in production.
export const users: User[] = [
  {
    id: '1',
    email: 'admin@admin.com',
    name: 'Admin',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=admin',
  },
]

// DEMO ONLY: passwords stored in plain text for simplicity.
// In production, use bcrypt/argon2 to hash and compare passwords.
export const passwords: Record<string, string> = {
  'admin@admin.com': 'admin123',
}

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
