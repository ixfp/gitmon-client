import { cookies } from 'next/headers'
import AddPost from './AddPost'

export default async function Page() {
  const token = (await cookies()).get('github_token')?.value ?? null
  return <AddPost token={token} />
}
