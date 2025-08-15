import gitmonLogo from '@assets/gitmon.svg'
import React from 'react'
import '@styles/landing.css'
import Image from 'next/image'
import GithubLoginButton from '@components/GithubLoginButton'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function Landing() {
  const cookieStore = await cookies()
  const token = cookieStore.get('github_token')?.value

  if (token) {
    redirect('/my-post')
  }

  return (
    <div className="flex flex-col items-center">
      <a
        className="flex justify-center"
        href="https://github.com/ixfp/gitmon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={gitmonLogo}
          className="size-24 p-6 transition-filter duration-300"
          alt="Gitmon logo"
        />
      </a>
      <h1>gitmon.blog</h1>
      <p className="read-the-docs">
        A blog integrated with GitHub for easy content synchronization and updates.
      </p>
      <br />
      <GithubLoginButton />
    </div>
  )
}

export default Landing
