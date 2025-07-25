import { PostList } from '@components/Post'
import { fetchPosts } from '@lib/github'
import { replaceId } from '@lib/utils'

async function BlogMain({ params }: { params: Promise<{ id: string; repo: string }> }) {
  const { id, repo } = await params
  const posts = await fetchPosts({ id: replaceId(id), repo })

  if (!posts) {
    return (
      <div className="p-8 text-center text-gray-500">글을 불러오는 중 오류가 발생했습니다.</div>
    )
  } else if (posts.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        이 저장소에는 아직 글이 없습니다. 첫 글을 작성해보세요!
      </div>
    )
  }

  return <PostList posts={posts} />
}

export default BlogMain
