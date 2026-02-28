import { Role } from '@prisma/client'

// Define route patterns for each role
// Use strings or regex patterns; we'll use string prefixes for simplicity
export const rolePermissions: Record<Role, string[]> = {
  [Role.USER]: [
    '/dashboard',
    '/api/protected/',
    '/api/auth/logout', // we'll implement later
  ],
  [Role.ADMIN]: [
    '/dashboard',
    '/admin/',
    '/api/admin/',
    '/api/protected/',
  ],
  [Role.SUPERADMIN]: ['*'], // wildcard for all routes
}

// Helper to check if a path is allowed for a role
export function isPathAllowedForRole(path: string, role: Role): boolean {
  const allowedPatterns = rolePermissions[role]
  
  // Superadmin allowed everything
  if (allowedPatterns.includes('*')) {
    return true
  }

  return allowedPatterns.some(pattern => path.startsWith(pattern))
}