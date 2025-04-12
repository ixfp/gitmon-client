'use client'

import { useState, useEffect } from 'react'
import type { Comment } from '@lib/types'
import { CommentItem } from '@components/CommentItem'
import { CommentForm } from '@components/CommentForm'
import { Separator } from '@components/ui/separator'

interface CommentListProps {
  postSlug: string
  initialComments?: Comment[]
}

export function CommentList({ postSlug, initialComments = [] }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)

  // Load comments from localStorage on initial render
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments-${postSlug}`) || '[]')
    if (storedComments.length > 0) {
      setComments(storedComments)
    }
  }, [postSlug])

  const handleCommentAdded = (newComment: Comment) => {
    setComments(prev => [...prev, newComment])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>
      </div>

      <CommentForm postSlug={postSlug} onCommentAdded={handleCommentAdded} />

      <Separator />

      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="py-6 text-center text-muted-foreground">
          Be the first to comment on this post!
        </div>
      )}
    </div>
  )
}
