'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function GitRouter() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  useEffect(() => {
    if (!code) return

    const login = async () => {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
        credentials: 'include',
      })

      const { isRepoCreated } = await res.json()

      if (!isRepoCreated) {
        window.location.href = '/create-repo'
      } else {
        window.location.href = '/my-post'
      }
    }

    login()
  }, [code])

  return <div>Authenticating...</div>
}
