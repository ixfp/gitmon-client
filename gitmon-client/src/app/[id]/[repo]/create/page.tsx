'use client'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { PostForm } from '@components/Post'
import matter from 'gray-matter'
import { titleToSlug } from '@lib/utils'
import { PostMeta } from '@lib/types'

export default function AddPost() {
  const params = useParams()
  const router = useRouter()
  const { mutate } = useMutation({
    mutationFn: async ({ title, blob }: { title: string; blob: Blob }) => {
      const formData = new FormData()
      const fileName = titleToSlug(title)
      formData.append('title', fileName)
      formData.append('content', blob, fileName)
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('github_token='))
        ?.split('=')[1]

      const headers = token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/posting`, {
        method: 'POST',
        headers,
        body: formData,
      })

      if (!response.ok) {
        toast('Failed to save the post')

        throw new Error('Failed to save the post')
      }
      return response.json()
    },
    onSuccess: (_res, { title }) => {
      toast('Your post has been saved')
      router.push(`/${params.id}/${params.repo}/${titleToSlug(title)}`)
    },
  })

  const handleSavePost = ({ title, content }: { title: string; content: string }) => {
    if (!title.trim()) {
      toast('Please enter a title for your post')
      return
    }
    if (typeof params.id !== 'string') {
      toast('Invalid author ID')
      return
    }

    const metadata: PostMeta = {
      title: title.trim(),
      slug: titleToSlug(title),
      repo: typeof params.repo === 'string' ? params.repo : '',
      excerpt: content.slice(0, 100),
      coverImage: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pinned: false,
      tags: [],
      author: params.id.replace('%40', ''),
    }

    const markdown = matter.stringify(content, metadata)

    const blob = new Blob([markdown], { type: 'text/markdown' })

    mutate({ title, blob })
  }
  return (
    <div className="p-4">
      <PostForm onPostSaved={handleSavePost} />
    </div>
  )
}
