// 이미지 업로드 유틸리티: 멀티파트 업로드 후 이미지 URL을 반환합니다.

const MAX_BYTES = 10 * 1024 * 1024 // 10MB
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif']

function getExtension(filename: string): string {
  const parts = filename.split('.')
  return parts.length > 1 ? parts.pop()!.toLowerCase() : ''
}

function assertPreconditions(file: File) {
  const ext = getExtension(file.name)
  if (!file.type.startsWith('image/')) {
    throw new Error('이미지 파일만 업로드할 수 있습니다.')
  }
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    throw new Error('허용되지 않은 이미지 확장자입니다.')
  }
  if (file.size > MAX_BYTES) {
    throw new Error('이미지 용량이 너무 큽니다. 최대 10MB까지 허용됩니다.')
  }
}

export async function uploadImage(file: File, token: string): Promise<string> {
  assertPreconditions(file)

  const baseUrl = process.env.NEXT_PUBLIC_API_DOMAIN
  if (!baseUrl) {
    throw new Error('이미지 업로드 설정이 올바르지 않습니다(NEXT_PUBLIC_API_DOMAIN).')
  }

  const path = '/api/v1/posting/images'
  const url = `${baseUrl}${path}`

  const form = new FormData()
  form.append('image', file)

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  })

  let payload: any = await res.json()

  if (res.status === 201) {
    const imageUrl = payload?.data
    if (typeof imageUrl === 'string' && imageUrl.length > 0) {
      return imageUrl
    }
    throw new Error('이미지 업로드 응답이 올바르지 않습니다.')
  }

  const serverMessage = payload?.errorMessage as string | undefined

  if (res.status === 400) {
    throw new Error(serverMessage || '허용되지 않은 이미지 확장자입니다.')
  }
  if (res.status === 409) {
    throw new Error(serverMessage || '레포지토리가 아직 설정되지 않았습니다.')
  }
  if (res.status === 401 || res.status === 403) {
    throw new Error(serverMessage || '인증이 만료되었거나 권한이 없습니다.')
  }

  throw new Error(serverMessage || '이미지 업로드에 실패했습니다.')
}

export const ImageUploadPolicy = {
  maxBytes: MAX_BYTES,
  allowedExtensions: ALLOWED_EXTENSIONS,
}


