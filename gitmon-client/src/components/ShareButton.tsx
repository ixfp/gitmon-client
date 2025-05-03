'use client'
import React from 'react'
import { Button } from './ui'
import { LinkIcon } from 'lucide-react'
import { toast } from 'sonner'

export function ShareButton({ path }: { path: string }) {
  return (
    <Button
      variant="link"
      onClick={() => {
        navigator.clipboard
          .writeText(`${window.location.origin}${path}`)
          .then(() => toast('링크가 복사되었습니다!'))
          .catch(() => toast('복사에 실패했습니다.'))
      }}
    >
      <LinkIcon />
    </Button>
  )
}
