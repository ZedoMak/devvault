import { NextRequest, NextResponse } from 'next/server'
import { loginSchema } from '@/lib/validations/auth'
import { authenticateUser } from '@/lib/services/auth.service'
import { createSession } from '@/lib/services/session.service'
import { generateRefreshToken } from '../../../../lib/utils/refresh-token.utils'
import { signAccessToken } from '@/lib/utils/jwt.utils'
import { ZodError } from 'zod'
import { cookies } from 'next/headers'


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)

    // Authenticate user
    const user = await authenticateUser(validatedData)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate tokens
    const accessToken = signAccessToken({ userId: user.id, role: user.role })
    const refreshToken = generateRefreshToken()

    // Create session (stores hash of refresh token)
    await createSession(user.id, refreshToken)

    // Set cookies
    const cookieStore = await cookies()
    
    // Access token cookie (15 minutes)
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60, // 15 minutes in seconds
      path: '/',
    })

    // Refresh token cookie (7 days)
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/',
    })

    // Return user info (without sensitive data)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    }, { status: 200 })

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

console.log("Refresh token module loaded")