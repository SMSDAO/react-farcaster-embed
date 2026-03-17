import { SignJWT, jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || 'neo-flash-glow-secret-key-change-in-production'
)

export type UserRole = 'admin' | 'user' | 'developer'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
}

// In-memory user store (replace with database in production)
export const users: User[] = [
  {
    id: '1',
    email: 'admin@admin.com',
    name: 'Admin',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=admin',
  },
]

export const passwords: Record<string, string> = {
  'admin@admin.com': 'admin123',
}

export async function createToken(user: User): Promise<string> {
  return new SignJWT({ id: user.id, email: user.email, role: user.role, name: user.name })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET)
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as unknown as User
  } catch {
    return null
  }
}

export function hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
  const hierarchy: Record<UserRole, number> = { admin: 3, developer: 2, user: 1 }
  return hierarchy[userRole] >= hierarchy[requiredRole]
}
