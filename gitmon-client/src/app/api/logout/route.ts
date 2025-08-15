import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete('github_token') // 쿠키 삭제

  return new Response('Logged out successfully', {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
