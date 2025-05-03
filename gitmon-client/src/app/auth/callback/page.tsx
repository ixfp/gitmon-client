'use client'

import { useMutation } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const GitRouter = () => {
  const searchParams = useSearchParams()

  const { mutate } = useMutation({
    mutationFn: async (code: string) => {
      const endpointUrl = new URL(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/login/oauth/github/tokens`,
      )
      if (process.env.NODE_ENV === 'development') {
        endpointUrl.searchParams.set('profile', 'dev')
      }

      const response = await fetch(endpointUrl.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
        }),
      })

      if (response.ok) {
        const res = new Response(response.body)
        const data = await res.json()
        return data
      }
    },
    onSuccess: data => {
      if (data.status === 'SUCCESS') {
        const { accessToken, isRepoCreated } = data.data
        document.cookie = `github_token=${accessToken}; path=/; secure`

        if (!isRepoCreated) {
          window.location.href = `/create-repo`
        } else {
          // 유저 정보 api 추가 시 변경
          window.location.href = `/@tevem1207/gitmon`
        }
      } else {
        console.error('Authentication status failed:', data)
      }
    },
    onError: error => {
      console.error('Authentication failed:', error)
    },
  })

  useEffect(() => {
    const code = searchParams.get('code')
    if (code) {
      mutate(code)
    }
  }, [searchParams, mutate])

  return <div>Authenticating...</div>
}

export default GitRouter
