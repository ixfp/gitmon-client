import { cookies } from 'next/headers'
import UpdatePost from './UpdatePost'

export default async function Page() {
  const token = (await cookies()).get('github_token')?.value ?? null
  return <UpdatePost token={token} />
}
