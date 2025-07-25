import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { code } = await req.json()

  const endpointUrl = new URL(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/login/oauth/github/tokens`,
  )
  if (process.env.NODE_ENV === 'development') {
    endpointUrl.searchParams.set('profile', 'dev')
  }

  const res = await fetch(endpointUrl.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
    }),
  })

  if (res.status !== 200) {
    console.error('Authentication status failed:', res)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }

  const {
    data: { accessToken, isRepoCreated, id },
  } = await res.json()

  const response = NextResponse.json({ isRepoCreated, id, accessToken })

  response.cookies.set({
    name: 'github_token',
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  })

  response.cookies.set({
    name: 'my_id',
    value: id,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  })

  return response
}
