'use client'

import { Button } from '@components/ui'
import { useRouter } from 'next/navigation'
import React from 'react'

interface PostButtonsProps {
    id: string
    repo: string
    slug: string
}

export const PostButtons = ({ id, repo, slug }: PostButtonsProps) => {
    const router = useRouter()

    const handleUpdate = () => {
        router.push(`/@${id}/${repo}/${slug}/update`)
    }

    const handleDelete = () => {
        const confirm = window.confirm('정말 삭제하시겠습니까?')
        if (confirm) {
            console.log('delete')
        }
    }
  return (
    <div className="flex items-center gap-4">
      <Button onClick={handleUpdate} variant="outline" >수정</Button>
      <Button onClick={handleDelete} variant="outline" >삭제</Button>
    </div>
  )
}
