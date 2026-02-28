import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!
const ACCESS_TOKEN_EXPIRY = '15m'

export type JWTPayload = {
  userId: string
  role: string
}

export function signAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY })
}

export function verifyAccessToken(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload
}