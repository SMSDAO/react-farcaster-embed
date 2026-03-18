import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

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

const protectedRoutes = ['/dashboard', '/admin', '/profile', '/timeline', '/airdrop']
const authRoutes = ['/login', '/signup']

async function getUser(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as { id: string; email: string; role: string; name: string }
  } catch {
    return null
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value
  const user = token ? await getUser(token) : null

  if (protectedRoutes.some(r => pathname.startsWith(r))) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (pathname.startsWith('/admin') && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  if (authRoutes.includes(pathname) && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
