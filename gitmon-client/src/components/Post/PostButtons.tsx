'use client'

import { Button } from '@components/ui'
import React from 'react'

export const PostButtons = () => {

    const handleUpdate = () => {
        console.log('update')
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
