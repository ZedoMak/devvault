import { prisma } from '@/lib/prisma'
import { verifyPassword } from '@/lib/utils/password.utils'
import { LoginInput } from '@/lib/validations/auth'

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