import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  // Double-check role from headers (set by middleware)
  const userRole = request.headers.get('x-user-role')
  console.log('Admin API: x-user-role header =', userRole);
  // Only allow ADMIN or SUPERADMIN
  if (userRole !== 'ADMIN' && userRole !== 'SUPERADMIN') {
    console.log('Admin API: forbidden - insufficient role');
    return NextResponse.json(
      { error: 'Forbidden: Insufficient permissions' },
      { status: 403 }
    )
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    })
    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}