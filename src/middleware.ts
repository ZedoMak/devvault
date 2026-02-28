import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAccessToken } from '@/lib/utils/jwt.utils'
import { isPathAllowedForRole } from '@/lib/auth/permissions'
import { Role } from '@prisma/client'

const publicPaths = ['/api/auth/login', '/api/auth/register']

export async function middleware(request: NextRequest) {
  console.log('🚀 Middleware executing for path:', request.nextUrl.pathname)

  const { pathname } = request.nextUrl

  if (publicPaths.some(path => pathname.startsWith(path))) {
    console.log('✅ Public path – allowing')
    return NextResponse.next()
  }

  const accessToken = request.cookies.get('accessToken')?.value
  console.log('🔑 Token present?', !!accessToken)

  if (!accessToken) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    } else {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  try {
    const payload = await verifyAccessToken(accessToken)
    console.log('📦 Token payload:', payload)

    const userRole = payload.role as Role
    const allowed = isPathAllowedForRole(pathname, userRole)
    console.log('🔒 Path allowed?', allowed)

    if (!allowed) {
      console.log('⛔ Role not allowed for this path')
      if (pathname.startsWith('/api')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      } else {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    }

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', payload.userId)
    requestHeaders.set('x-user-role', payload.role)

    return NextResponse.next({
      request: { headers: requestHeaders },
    })
  } catch (error) {
    console.log('❌ Token verification failed:', error.message)
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    } else {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*', '/admin/:path*'],
}