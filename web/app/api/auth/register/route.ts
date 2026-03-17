import { NextRequest, NextResponse } from 'next/server'
import { users, passwords, createToken } from '@/lib/auth'
import type { User } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { email, password, name, role = 'user' } = await req.json()

  if (users.find(u => u.email === email)) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 })
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    role: role === 'developer' ? 'developer' : 'user',
    avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${email}`,
  }

  users.push(newUser)
  passwords[email] = password

  const token = await createToken(newUser)
  const response = NextResponse.json({ user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role } })
  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}
