'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { Textarea } from '@components/ui/textarea'
import { Card } from '@components/ui/card'
import MarkdownPreview from './markdown-preview'
import ToolbarButton from './toolbar-button'
import ImageUploader from './image-uploader'
import { uploadImage } from '@lib/upload'
import { toast } from 'sonner'
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  LinkIcon,
  Save,
  CornerDownLeft,
  ImageIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Post } from '@lib/types'

interface PostFormProps {
  onPostSaved: (post: { title: string; content: string }) => void
  post: Omit<Post, 'id'> | null
  token?: string | null
}

export function PostForm({ onPostSaved, post, token }: PostFormProps) {
  const params = useParams()
  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.content || '')
  const [showImageUploader, setShowImageUploader] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertTextAtCursor = useCallback(
    (textBefore: string, textAfter = '') => {
      if (!textareaRef.current) return

      const textarea = textareaRef.current
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = content.substring(start, end)

      const newText =
        content.substring(0, start) + textBefore + selectedText + textAfter + content.substring(end)

      setContent(newText)

      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(
          start + textBefore.length,
          start + textBefore.length + selectedText.length,
        )
      }, 0)
    },
    [content],
  )

  const handleFormatClick = (format: string) => {
    switch (format) {
      case 'bold':
        insertTextAtCursor('**', '**')
        break
      case 'italic':
        insertTextAtCursor('_', '_')
        break
      case 'h1':
        insertTextAtCursor('# ')
        break
      case 'h2':
        insertTextAtCursor('## ')
        break
      case 'h3':
        insertTextAtCursor('### ')
        break
      case 'ul':
        insertTextAtCursor('- ')
        break
      case 'ol':
        insertTextAtCursor('1. ')
        break
      case 'quote':
        insertTextAtCursor('> ')
        break
      case 'code':
        insertTextAtCursor('```\n', '\n```')
        break
      case 'link':
        insertTextAtCursor('[', '](url)')
        break
      case 'image':
        setShowImageUploader(true)
        break
      default:
        break
    }
  }

  const handleImageInsert = (imageUrl: string) => {
    insertTextAtCursor(`![](${imageUrl})`)
    setShowImageUploader(false)
  }

  const handleFilesToUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return
    const fileArray = Array.from(files)
    const imageFile = fileArray.find(f => f.type.startsWith('image/'))
    if (!imageFile) return
    if (!token) {
      toast('로그인이 필요하거나 토큰이 없습니다.')
      return
    }
    try {
      setIsUploading(true)
      const url = await uploadImage(imageFile, token)
      insertTextAtCursor(`![](${url})`)
    } catch (e: any) {
      toast(e?.message || '이미지 업로드에 실패했습니다.')
    } finally {
      setIsUploading(false)
    }
  }

  const onDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
  }

  const onDrop = async (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const dt = e.dataTransfer
    if (dt?.files && dt.files.length > 0) {
      await handleFilesToUpload(dt.files)
    }
  }

  const onPaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.files
    if (items && items.length > 0) {
      const hasImage = Array.from(items).some(f => f.type.startsWith('image/'))
      if (hasImage) {
        e.preventDefault()
        await handleFilesToUpload(items)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <Input
          placeholder="제목을 입력하세요..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="text-xl font-semibold"
        />

        <div className="flex flex-wrap gap-1 border rounded-md p-1 bg-muted/30">
          <ToolbarButton
            icon={<Bold size={18} />}
            onClick={() => handleFormatClick('bold')}
            tooltip="Bold"
          />
          <ToolbarButton
            icon={<Italic size={18} />}
            onClick={() => handleFormatClick('italic')}
            tooltip="Italic"
          />
          <ToolbarButton
            icon={<Heading1 size={18} />}
            onClick={() => handleFormatClick('h1')}
            tooltip="Heading 1"
          />
          <ToolbarButton
            icon={<Heading2 size={18} />}
            onClick={() => handleFormatClick('h2')}
            tooltip="Heading 2"
          />
          <ToolbarButton
            icon={<Heading3 size={18} />}
            onClick={() => handleFormatClick('h3')}
            tooltip="Heading 3"
          />
          <ToolbarButton
            icon={<List size={18} />}
            onClick={() => handleFormatClick('ul')}
            tooltip="Bullet List"
          />
          <ToolbarButton
            icon={<ListOrdered size={18} />}
            onClick={() => handleFormatClick('ol')}
            tooltip="Numbered List"
          />
          <ToolbarButton
            icon={<Quote size={18} />}
            onClick={() => handleFormatClick('quote')}
            tooltip="Quote"
          />
          <ToolbarButton
            icon={<Code size={18} />}
            onClick={() => handleFormatClick('code')}
            tooltip="Code Block"
          />
          <ToolbarButton
            icon={<LinkIcon size={18} />}
            onClick={() => handleFormatClick('link')}
            tooltip="Link"
          />
          <ToolbarButton
            icon={<ImageIcon size={18} />}
            onClick={() => handleFormatClick('image')}
            tooltip="Image"
          />
        </div>
      </div>

      <Tabs defaultValue="write" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="mt-2">
          <Textarea
            ref={textareaRef}
            placeholder="Write your post content in markdown..."
            value={content}
            onChange={e => setContent(e.target.value)}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onPaste={onPaste}
            className="min-h-[400px] font-mono text-sm resize-y"
          />
        </TabsContent>
        <TabsContent value="preview" className="mt-2">
          <Card className="p-4 min-h-[400px] overflow-auto">
            <MarkdownPreview content={content} />
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <div className="space-x-2">
          <Button className="gap-2" asChild>
            <Link href={`/${params.id}/${params.repo}`}>
              <CornerDownLeft size={16} />
              뒤로 갑시다.
            </Link>
          </Button>

          <Button onClick={() => onPostSaved({ title, content })} className="gap-2">
            <Save size={16} />
            <p>글 작성</p>
          </Button>
        </div>
      </div>

      {showImageUploader && (
        <ImageUploader
          token={token || null}
          onImageInsert={handleImageInsert}
          onCancel={() => setShowImageUploader(false)}
        />
      )}
    </div>
  )
}
