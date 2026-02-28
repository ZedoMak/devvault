import crypto from 'crypto'
import bcrypt from 'bcrypt'

const REFRESH_TOKEN_BYTES = 32 // 256 bits
const BCRYPT_ROUNDS = 12

export function generateRefreshToken(): string {
  return crypto.randomBytes(REFRESH_TOKEN_BYTES).toString('hex')
}

export async function hashRefreshToken(token: string): Promise<string> {
  return bcrypt.hash(token, BCRYPT_ROUNDS)
}

export async function verifyRefreshToken(token: string, hash: string): Promise<boolean> {
  return bcrypt.compare(token, hash)
}

console.log("UTIL FILE LOADED")