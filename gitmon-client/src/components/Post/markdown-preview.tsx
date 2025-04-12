'use client'

import { useEffect, useState } from 'react'

import MarkdownRenderer from '@components/MarkdownRenderer'

interface MarkdownPreviewProps {
  content: string
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="animate-pulse bg-muted h-[400px]"></div>
  }

  return (
    <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
      <MarkdownRenderer markdown={content} />
    </div>
  )
}
