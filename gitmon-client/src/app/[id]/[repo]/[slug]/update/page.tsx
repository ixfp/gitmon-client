import Link from 'next/link';
import { cookies } from 'next/headers'

import UpdatePost from './UpdatePost'
import { replaceId } from '@lib/utils';
import { fetchPost } from '@lib/github';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; id: string; repo: string }>
}) {
  const { id, repo, slug } = await params
  const token = (await cookies()).get('github_token')?.value ?? null


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/posting/github/${replaceId(id)}/${slug}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )

  const { data } = await res.json()

  if (!data?.githubDownloadUrl) {
    return (
      <div>
        해당 포스트를 찾을 수 없습니다. <br />
        <Link href={`/@${replaceId(id)}/${repo}`} className="text-blue-500 hover:underline">
          다른 포스트 보기
        </Link>
      </div>
    )
  }
  const post = await fetchPost(data?.githubDownloadUrl)


  return <UpdatePost token={token} post={post} />
}
