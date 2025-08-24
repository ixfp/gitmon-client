import matter from 'gray-matter'
import { Post, PostMeta } from './types'

export interface RepoInfo {
  id: string
  repo: string
  branch?: string
}

export async function fetchPost(fileUrl: string): Promise<Omit<Post, 'id'>> {
  const encodedUrl = encodeURI(fileUrl).replace(/\?/g, '%3F')

  const res = await fetch(encodedUrl, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch: ${fileUrl}`)

  const rawMarkdown = await res.text()
  const { data, content } = matter(rawMarkdown) as unknown as {
    data: PostMeta
    content: string
  }

  return { ...data, content }
}
