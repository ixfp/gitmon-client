import { cookies } from 'next/headers'
import SetRepositoryName from './SetRepositoryName'

export default async function Page() {
  const token = (await cookies()).get('github_token')?.value ?? null
  return <SetRepositoryName token={token} />
}
