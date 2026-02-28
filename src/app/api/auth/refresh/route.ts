import { NextRequest, NextResponse } from 'next/server'
import { verifyRefreshToken, signAccessToken, signRefreshToken } from '@/lib/utils/jwt.utils'
import { findSessionById, rotateSession, revokeAllUserSessions } from '@/lib/services/session.service'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'No refresh token provided' },
        { status: 401 }
      )
    }

    // Verify refresh token
    let payload
    try {
      payload = await verifyRefreshToken(refreshToken)
    } catch (error) {
      // Token invalid or expired
      // Clear cookies and return 401
      const response = NextResponse.json(
        { error: 'Invalid refresh token' },
        { status: 401 }
      )
      response.cookies.delete('accessToken')
      response.cookies.delete('refreshToken')
      return response
    }

    const { sessionId, userId } = payload

    // Find session
    const session = await findSessionById(sessionId)
    
    // Check if session exists and is not revoked
    if (!session || session.isRevoked || session.expiresAt < new Date()) {
      // Token reuse detected or session expired
      // For security, revoke all user sessions
      if (session?.userId) {
        await revokeAllUserSessions(session.userId)
      }
      
      const response = NextResponse.json(
        { error: 'Session invalid. Please login again.' },
        { status: 403 }
      )
      response.cookies.delete('accessToken')
      response.cookies.delete('refreshToken')
      return response
    }

    // Check if this session belongs to the user in token
    if (session.userId !== userId) {
      // Mismatch – possible tampering
      const response = NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
      response.cookies.delete('accessToken')
      response.cookies.delete('refreshToken')
      return response
    }

    // Rotate session: create new session, revoke old one
    const newSessionId = await rotateSession(sessionId, userId)

    // Generate new tokens
    const newAccessToken = await signAccessToken({ userId, role: session.user.role })
    const newRefreshToken = await signRefreshToken({ sessionId: newSessionId, userId })

    // Set new cookies
    const response = NextResponse.json({ success: true })

    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    })

    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })

    return response

  } catch (error) {
    console.error('Refresh error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}