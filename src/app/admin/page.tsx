import { headers } from 'next/headers'

export default async function AdminPage() {
  const headersList = await headers()
  const userId = headersList.get('x-user-id')
  const userRole = headersList.get('x-user-role')

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Welcome, admin! (User ID: {userId}, Role: {userRole})</p>
      <p>This page is only accessible to users with ADMIN or SUPERADMIN role.</p>
    </div>
  )
}