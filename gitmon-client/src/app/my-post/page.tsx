import { PostList } from '@components/Post'
import { fetchPost } from '@lib/github'
import { cookies } from 'next/headers'

async function BlogMain() {
  const cookieStore = await cookies()
  const token = cookieStore.get('github_token')?.value
  const id = cookieStore.get('my_id')?.value

  const { data: urlPosts } = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/posting/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch posts')
      }
      console.log(res)
      return res.json()
    })
    .catch(() => null)

  if (!urlPosts) {
    return (
      <div className="p-8 text-center text-gray-500">글을 불러오는 중 오류가 발생했습니다.</div>
    )
  } else if (urlPosts.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        이 저장소에는 아직 글이 없습니다. 첫 글을 작성해보세요!
      </div>
    )
  }

  const posts = urlPosts.map(
    async (post: {
      id: number
      title: string
      githubDownloadUrl: string
      createdAt: string
      updatedAt: string
    }) => {
      return await fetchPost(post.githubDownloadUrl)
    },
  )

  return <PostList posts={await Promise.all(posts)} />
}

export default BlogMain
