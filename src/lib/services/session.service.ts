import { prisma } from '@/lib/prisma'

const SESSION_EXPIRY_DAYS = 7

export async function createSession(userId: string): Promise<string> {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS)

  const session = await prisma.session.create({
    data: {
      userId,
      expiresAt,
      isRevoked: false,
    },
  })
  return session.id
}

export async function findSessionById(sessionId: string) {
  return prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true }
  })
}

export async function revokeSession(sessionId: string) {
  return prisma.session.update({
    where: { id: sessionId },
    data: { isRevoked: true }
  })
}

export async function revokeAllUserSessions(userId: string) {
  return prisma.session.updateMany({
    where: { userId },
    data: { isRevoked: true }
  })
}

export async function rotateSession(oldSessionId: string, userId: string): Promise<string> {
  // Use transaction to ensure consistency
  return prisma.$transaction(async (tx) => {
    // Revoke old session
    await tx.session.update({
      where: { id: oldSessionId },
      data: { isRevoked: true }
    })

    // Create new session
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS)

    const newSession = await tx.session.create({
      data: {
        userId,
        expiresAt,
        isRevoked: false,
      }
    })

    return newSession.id
  })
}