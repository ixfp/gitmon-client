import { PostList } from '@components/Post'
import { fetchPost } from '@lib/github'
import { Post } from '@lib/types'
import { replaceId } from '@lib/utils'

async function BlogMain({ params }: { params: Promise<{ id: string; repo: string }> }) {
  const { id } = await params
  const { data: urlPosts } = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/posting/github/${replaceId(id)}`,
    {
      headers: {
        'Content-Type': 'application/json',
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

  const posts: Promise<Post>[] = urlPosts.map(
    async (post: {
      id: number
      title: string
      githubDownloadUrl: string
      createdAt: string
      updatedAt: string
    }) => {
      try {
        return await fetchPost(post.githubDownloadUrl)
      } catch (error) {
        console.error(`Failed to fetch post ${post.id}:`, error)
        return { ...post, error: true }
      }
    },
  )

  return <PostList posts={await Promise.all(posts)} />
}

export default BlogMain
