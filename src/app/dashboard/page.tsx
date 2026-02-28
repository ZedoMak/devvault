import { headers } from 'next/headers'

export default async function DashboardPage() {
  const headersList = headers()
  const userId = (await headersList).get('x-user-id')
  const userRole = (await headersList).get('x-user-role')

  return (
    <div>
      <h1>Dashboard</h1>
      <p>User ID: {userId}</p>
      <p>Role: {userRole}</p>
    </div>
  )
}