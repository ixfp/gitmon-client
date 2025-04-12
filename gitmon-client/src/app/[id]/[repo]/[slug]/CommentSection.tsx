'use client'
import { useState, useEffect } from 'react'
import type { Comment } from '@lib/types'
import { CommentList } from '@components/CommentList'

export const CommentSection = ({ postSlug }: { postSlug: string }) => {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments-${postSlug}`) || '[]')
    setComments(storedComments)
  }, [postSlug])
  return <CommentList postSlug={postSlug} initialComments={comments} />
}
