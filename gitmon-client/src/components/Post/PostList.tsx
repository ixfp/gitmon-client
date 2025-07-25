import React from 'react'

import type { Post } from '@lib/types'
import Link from 'next/link'

import { formatDate } from '@lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Badge } from '@components/ui/badge'

interface PostListProps {
  posts: Post[]
}

export function PostListItem({ post }: { post: Post }) {
  const blogUrl = `/@${post.author}/${post.repo}/${post.slug}`
  return (
    <Link href={blogUrl} className="group flex flex-col gap-8 border-b last:border-none p-4 pb-8">
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Avatar className="size-8">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Current User" />
            <AvatarFallback>CU</AvatarFallback>
          </Avatar>
          <span>{post.author}</span>
        </div>
        <time className="" dateTime={post.createdAt}>
          {formatDate(post.createdAt)}
        </time>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="font-bold text-4xl">{post.title}</h2>
        <p className="text-lg">{post.excerpt}</p>
      </div>
      <div className="flex gap-2">
        <Badge variant="secondary">Tags</Badge>
      </div>
    </Link>
  )
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="flex flex-col gap-10 w-full">
      {posts.map((post, index) => (
        <PostListItem key={index} post={post} />
      ))}
    </div>
  )
}
