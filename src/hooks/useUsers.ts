import { useQuery, UseQueryResult } from '@tanstack/react-query'

interface User {
  id: number
  name: string
  email: string
}

const fetchUsers = async (): Promise<User[]> => {
  // Replace with your actual API endpoint
  const response = await fetch('/api/users')
  if (!response.ok) throw new Error('Failed to fetch users')
  return response.json()
}

export function useUsers(): UseQueryResult<User[], Error> {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}

