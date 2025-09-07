'use client'

import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { PostForm } from '@components/Post'
import matter from 'gray-matter'
import { titleToSlug } from '@lib/utils'
import { Post, PostMeta } from '@lib/types'

interface UpdatePostProps {
  token: string | null
  post: Omit<Post, 'id'> | null
}

export default function UpdatePost({ token, post }: UpdatePostProps) {
  const router = useRouter()
  const { slug } = useParams()
  const [user, setUser] = useState<{ id: string; repo: string }>()
  const { mutate } = useMutation({
    // 해당 부분을 업데이트치는 API 호출로 변경해야 함
    mutationFn: async ({ title, blob }: { title: string; blob: Blob }) => {
      const body = new FormData()
      const fileName = titleToSlug(title)
      body.append('title', fileName)
      body.append('content', blob, fileName)
      body.append('id', slug as string)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/posting`, {
        method: post ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      })

      if (!response.ok) {
        toast('게시글 저장에 실패했습니다.')
        throw new Error('게시글 저장 실패')
      }
      return response
    },
    onSuccess: async (res, {}) => {
      const { data } = await res.json()

      toast('게시글이 저장되었습니다.')
      router.push(`/${user?.id}/${user?.repo}/${data.id}`)
    },
  })

  const handleSavePost = async ({ title, content }: { title: string; content: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/member`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      toast('사용자 정보를 가져오는 데 실패했습니다.')
      return
    }

    const { data } = await res.json()
    setUser({ id: data.githubUsername, repo: data.repoName })

    if (!data.githubUsername || !data.repoName) {
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
      repo: data.repoName,
      excerpt: content.slice(0, 100),
      coverImage: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pinned: false,
      tags: [],
      author: data.githubUsername,
    }

    const markdown = matter.stringify(content, metadata)
    const blob = new Blob([markdown], { type: 'text/markdown' })

    mutate({ title, blob })
  }

  return (
    <div className="p-4">
      <PostForm onPostSaved={handleSavePost} post={post} token={token} />
    </div>
  )
}
