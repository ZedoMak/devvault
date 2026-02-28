import { NextRequest, NextResponse } from 'next/server'
import { registerSchema } from '@/lib/validations/auth'
import { createUser } from '@/lib/services/user.service'
import { createSession } from '@/lib/services/session.service'
import { signAccessToken } from '@/lib/utils/jwt.utils'
import { generateRefreshToken } from '@/lib/utils/refresh-token.utils'
import { ZodError } from 'zod'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = registerSchema.parse(body)
    
    // Attempt to create user
    const result = await createUser(validatedData)
    
    if (!result.success) {
      if (result.code === 'EMAIL_EXISTS') {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        )
      }
    }
    
    // Auto-login after successful registration
    if (result.success && result.user) {
      // Generate tokens
      const accessToken = await signAccessToken({ userId: result.user.id, role: result.user.role })
      const refreshToken = generateRefreshToken()

      // Create session (stores hash of refresh token)
      await createSession(result.user.id)

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
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
        }
      }, { status: 201 })
    }
    
    // Fallback for any other cases
    return NextResponse.json(
      { user: result.user },
      { status: 201 }
    )
    
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    
    // Handle unexpected errors
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}