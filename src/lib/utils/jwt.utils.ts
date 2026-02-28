import * as jose from 'jose'
import { env } from '../env'

const encodedSecret = new TextEncoder().encode(env.JWT_SECRET)
const ACCESS_TOKEN_EXPIRY = '15m' // jose understands "15m", "1h",

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!
const encodedRefreshSecret = new TextEncoder().encode(JWT_REFRESH_SECRET)
const REFRESH_TOKEN_EXPIRY = '7d'

export type JWTPayload = {
  userId: string
  role: string
}

export async function signAccessToken(payload: JWTPayload): Promise<string> {
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(encodedSecret)
  return jwt
}

export async function verifyAccessToken(token: string): Promise<JWTPayload> {
  const { payload } = await jose.jwtVerify(token, encodedSecret, {
    algorithms: ['HS256'],
  })
  return payload as JWTPayload
}

export type RefreshTokenPayload = {
  sessionId: string
  userId: string
}

export async function signRefreshToken(payload: RefreshTokenPayload): Promise<string> {
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(encodedRefreshSecret)
  return jwt
}

export async function verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
  const { payload } = await jose.jwtVerify(token, encodedRefreshSecret, {
    algorithms: ['HS256'],
  })
  return payload as RefreshTokenPayload
}