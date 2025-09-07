import { PostList } from '@components/Post'
import { Post } from '@lib/types'
import { cookies } from 'next/headers'
import { BlogService } from '../../api/services'

async function BlogMain() {
  const cookieStore = await cookies()
  const token = cookieStore.get('github_token')?.value
  const id = cookieStore.get('my_id')?.value

  if (!id || !token) {
    return <div className="p-8 text-center text-gray-500">로그인이 필요합니다.</div>
  }

  if (!token) {
    return <div className="p-8 text-center text-gray-500">로그인이 필요합니다.</div>
  }

  try {
    const posts = await BlogService.getUserBlogPosts(token, id);
    console.log("posts", posts)

    if (!posts || posts.length === 0) {
      return (
        <div className="p-8 text-center text-gray-500">
          이 저장소에는 아직 글이 없습니다. 첫 글을 작성해보세요!
        </div>
      )
    }

    return <PostList posts={posts} />
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return (
      <div className="p-8 text-center text-gray-500">글을 불러오는 중 오류가 발생했습니다.</div>
    )
  }
}

export default BlogMain
