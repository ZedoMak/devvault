import * as jose from 'jose'

const JWT_SECRET = process.env.JWT_SECRET!
const encodedSecret = new TextEncoder().encode(JWT_SECRET)
const ACCESS_TOKEN_EXPIRY = '15m' // jose understands "15m", "1h", etc.

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