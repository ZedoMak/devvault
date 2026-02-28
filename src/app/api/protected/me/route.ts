import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Read user info from headers set by middleware
  const userId = request.headers.get('x-user-id')
  const userRole = request.headers.get('x-user-role')

  if (!userId) {
    // This should not happen if middleware is working, but just in case
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return NextResponse.json({
    userId,
    role: userRole,
    message: 'This is protected data',
  })
}