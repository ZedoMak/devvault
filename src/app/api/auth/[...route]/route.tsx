import { NextRequest, NextResponse } from 'next/server'
import { registerSchema } from '@/lib/validations/auth'
import { createUser } from '@/lib/services/user.service'
import { ZodError } from 'zod'

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
    
    // Success
    return NextResponse.json(
      { user: result.user },
      { status: 201 }
    )
    
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
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