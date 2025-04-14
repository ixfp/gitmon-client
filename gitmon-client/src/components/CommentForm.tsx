'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@components/ui/button'
import { Textarea } from '@components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import type { Comment } from '@lib/types'

interface CommentFormProps {
  postSlug: string
  onCommentAdded: (comment: Comment) => void
}

export function CommentForm({ postSlug, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) return

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/posts/${postSlug}/comments', {
      //   method: 'POST',
      //   body: JSON.stringify({ content })
      // })
      // const data = await response.json()

      // For demo purposes, we'll create a comment object
      const newComment: Comment = {
        id: Date.now().toString(),
        content,
        author: {
          name: 'Current User',
          image: '/placeholder.svg?height=40&width=40',
        },
        createdAt: new Date().toISOString(),
        postSlug,
      }

      // Add to local storage for persistence
      const comments = JSON.parse(localStorage.getItem(`comments-${postSlug}`) || '[]')
      localStorage.setItem(`comments-${postSlug}`, JSON.stringify([...comments, newComment]))

      // Notify parent component
      onCommentAdded(newComment)

      // Clear form
      setContent('')
    } catch (error) {
      console.error('Failed to add comment', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Current User" />
          <AvatarFallback>CU</AvatarFallback>
        </Avatar>
        <Textarea
          placeholder="Add a comment..."
          value={content}
          onChange={e => setContent(e.target.value)}
          className="min-h-[80px] flex-1 resize-none"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={!content.trim() || isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </div>
    </form>
  )
}
