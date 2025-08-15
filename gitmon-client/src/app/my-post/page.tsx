import { PostList } from '@components/Post'
import { fetchPost } from '@lib/github'
import { Post } from '@lib/types'
import { cookies } from 'next/headers'

async function BlogMain() {
  const cookieStore = await cookies()
  const token = cookieStore.get('github_token')?.value
  const id = cookieStore.get('my_id')?.value

  if (!id || !token) {
    return <div className="p-8 text-center text-gray-500">로그인이 필요합니다.</div>
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/posting/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  const { data } = await res.json()

  if (!data) {
    return (
      <div className="p-8 text-center text-gray-500">글을 불러오는 중 오류가 발생했습니다.</div>
    )
  } else if (data.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        이 저장소에는 아직 글이 없습니다. 첫 글을 작성해보세요!
      </div>
    )
  }

  const posts: Promise<Post>[] = data.map(
    async (post: {
      id: number
      title: string
      githubDownloadUrl: string
      createdAt: string
      updatedAt: string
    }) => {
      try {
        return { ...(await fetchPost(post.githubDownloadUrl)), id: post.id }
      } catch (error) {
        console.error(`Failed to fetch post ${post.id}:`, error)
        return { ...post, error: true }
      }
    },
  )

  return <PostList posts={await Promise.all(posts)} />
}

export default BlogMain
