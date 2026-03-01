import { prisma } from '@/lib/prisma'
import { verifyPassword } from '@/lib/utils/password.utils'
import { LoginInput } from '@/lib/validations/auth'
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/lib/utils/jwt.utils'

export async function authenticateUser(input: LoginInput) {
  const { email, password } = input

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      passwordHash: true,
      name: true,
      role: true,
    }
  })

  if (!user) {
    return null // user not found
  }

  // Verify password
  const isValid = await verifyPassword(password, user.passwordHash)
  if (!isValid) {
    return null
  }

  // Return user without passwordHash
  const { passwordHash: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    return null
  }

  try {
    const payload = await verifyAccessToken(accessToken)
    if (!payload || !payload.userId) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      }
    })

    return user
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
}