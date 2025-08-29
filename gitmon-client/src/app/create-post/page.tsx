import { cookies } from 'next/headers'
// import AddPost from './AddPost'
import UpdatePost from '../[id]/[repo]/[slug]/update/UpdatePost'

export default async function Page() {
  const token = (await cookies()).get('github_token')?.value ?? null
  return <UpdatePost token={token} post={null} />
}
