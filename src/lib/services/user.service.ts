import { prisma } from '@/lib/prisma'
import { RegisterInput } from '@/lib/validations/auth'
import { hashPassword } from '@/lib/utils/password.utils'
import { Prisma } from '@prisma/client'

export async function createUser(data: RegisterInput) {
  const { email, password, name } = data
  
  const passwordHash = await hashPassword(password)
  
  try {
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: 'USER' // default
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    })
    return { success: true, user }
  } catch (error) {
    // Handle unique constraint violation
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return { success: false, code: 'EMAIL_EXISTS' }
    }
    throw error // rethrow unexpected errors
  }
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase().trim() },
    select: {
      id: true,
      email: true,
      passwordHash: true,
      name: true,
      role: true
    }
  })
}