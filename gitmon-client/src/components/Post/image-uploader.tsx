'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@components/ui/dialog'
import { toast } from 'sonner'
import { Upload, LinkIcon } from 'lucide-react'
import Image from 'next/image'
import { uploadImage } from '@lib/upload'

interface ImageUploaderProps {
  onImageInsert: (imageUrl: string) => void
  onCancel: () => void
  token: string | null
}

export default function ImageUploader({ onImageInsert, onCancel, token }: ImageUploaderProps) {
  const [uploadType, setUploadType] = useState<'file' | 'url'>('file')
  const [imageUrl, setImageUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Create a preview URL
      const reader = new FileReader()
      reader.onload = event => {
        setPreviewUrl(event.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleInsert = async () => {
    if (uploadType === 'url') {
      if (!imageUrl.trim()) {
        toast('Please enter an image URL')
        return
      }
      onImageInsert(imageUrl)
    } else {
      if (!file) {
        toast('Please select an image file')
        return
      }
      if (!token) {
        toast('로그인이 필요하거나 토큰이 없습니다.')
        return
      }
      try {
        setIsUploading(true)
        const url = await uploadImage(file, token)
        onImageInsert(url)
      } catch (e: unknown) {
        toast((e as Error)?.message || '이미지 업로드에 실패했습니다.')
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Insert Image</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex gap-4">
            <Button
              variant={uploadType === 'file' ? 'default' : 'outline'}
              onClick={() => {
                setUploadType('file')
                setImageUrl('')
              }}
              className="flex-1 gap-2"
            >
              <Upload size={16} />
              Upload File
            </Button>
            <Button
              variant={uploadType === 'url' ? 'default' : 'outline'}
              onClick={() => {
                setUploadType('url')
                setFile(null)
                setPreviewUrl(null)
              }}
              className="flex-1 gap-2"
            >
              <LinkIcon size={16} />
              Image URL
            </Button>
          </div>

          {uploadType === 'file' ? (
            <div className="grid gap-2" key="file">
              <Label htmlFor="image-upload">Select Image</Label>
              <Input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} />
              {previewUrl && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                  <Image
                    src={previewUrl || '/placeholder.svg'}
                    alt="Preview"
                    width={200}
                    height={200}
                    unoptimized
                    className="max-h-[200px] max-w-full object-contain border rounded"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-2" key="url">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
              />
              {imageUrl && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                  <Image
                    src={imageUrl || '/placeholder.svg'}
                    alt="Preview"
                    width={200}
                    height={200}
                    unoptimized
                    className="max-h-[200px] max-w-full object-contain border rounded"
                    onError={() => {
                      toast('Failed to load image from URL')
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleInsert} disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Insert Image'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
