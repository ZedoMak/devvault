import { prisma } from '@/lib/prisma'
import { hashRefreshToken } from '@/lib/utils/refresh-token.utils'

const SESSION_EXPIRY_DAYS = 7

export async function createSession(userId: string, refreshToken: string): Promise<string> {
  const tokenHash = await hashRefreshToken(refreshToken)
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS)

  const session = await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  })
  return session.id
}

export async function findSessionByTokenHash(tokenHash: string) {
  return prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true }
  })
}
