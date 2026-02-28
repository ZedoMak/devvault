import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAccessToken } from '@/lib/utils/jwt.utils'
import { isPathAllowedForRole } from '@/lib/auth/permissions'
import { Role } from '@prisma/client'

const publicPaths = ['/api/auth/login', '/api/auth/register']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Add this after checking public paths, before token verification
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  // If no access token but refresh token exists, and we're not already in a refresh loop
  if (!accessToken && refreshToken && !request.headers.get('x-refresh-attempted')) {
    console.log('🔄 Attempting token refresh')
    
    // Call our refresh endpoint internally
    const refreshUrl = new URL('/api/auth/refresh', request.url)
    const refreshRequest = new Request(refreshUrl, {
      method: 'POST',
      headers: {
        cookie: `refreshToken=${refreshToken}`,
        'x-refresh-attempted': 'true', // Prevent loops
      },
    })

    const refreshResponse = await fetch(refreshRequest)
    
    if (refreshResponse.ok) {
      // Refresh successful – cookies will be set in the response
      // We need to continue the original request with the new cookies
      // The easiest way: let the client retry naturally, but we'll set cookies
      // and continue. The original request will still fail (no access token in this request),
      // but the client's next request will have the new token.
      
      // Copy Set-Cookie headers from refresh response to our response
      const setCookieHeader = refreshResponse.headers.get('set-cookie')
      if (setCookieHeader) {
        // We'll need to forward these cookies to the client
        // This is complex in middleware – for now, we'll just let the client
        // handle refresh via the API, and our proxy will redirect to login if needed.
        // In production, you'd implement a more sophisticated approach.
      }
    }
  }

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

    const userRole = payload.role as Role
    const allowed = isPathAllowedForRole(pathname, userRole)

    if (!allowed) {
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
    // Log error for debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Token verification failed:', error)
    }
    
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
