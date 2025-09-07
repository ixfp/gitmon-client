'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { PostForm } from '@components/Post'
import matter from 'gray-matter'
import { titleToSlug } from '@lib/utils'
import { PostMeta } from '@lib/types'
import { useState } from 'react'
import { BlogService, MemberService } from '../../api/services'

export default function AddPost({ token }: { token: string | null }) {
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; repo: string }>()

  const { mutate } = useMutation({
    mutationFn: async ({ title, content, metadata }: { title: string; content: string; metadata: PostMeta }) => {
      if (!token) throw new Error('토큰이 없습니다.');
      
      const response = await BlogService.createBlogPost(token, title, content, metadata);
      return response;
    },
    onSuccess: async (response, { title }) => {
      toast('게시글이 저장되었습니다.')
      router.push(`/${user?.id}/${user?.repo}/${title}`)
    },
  })

  const handleSavePost = async ({ title, content }: { title: string; content: string }) => {
    try {
      const response = await MemberService.getMember(token || '');
      
      if (!response.success || !response.data) {
        toast('사용자 정보를 가져오는 데 실패했습니다.')
        return
      }

      const { githubUsername, repoName } = response.data;
      setUser({ id: githubUsername, repo: repoName })

      if (!githubUsername || !repoName) {
        toast('레포지토리 정보가 없습니다. 먼저 레포지토리를 설정해주세요.')
        return
      }

      if (!title) {
        toast('게시글 제목을 입력해주세요.')
        return
      }

      const metadata: PostMeta = {
        title: title.trim(),
        slug: titleToSlug(title),
        repo: repoName,
        excerpt: content.slice(0, 100),
        coverImage: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        pinned: false,
        tags: [],
        author: githubUsername,
      }

      mutate({ title, content, metadata })
    } catch (error) {
      toast('사용자 정보를 가져오는 데 실패했습니다.')
    }
  }

  return (
    <div className="p-4">
      <PostForm onPostSaved={handleSavePost} post={null} token={token} />
    </div>
  )
}
