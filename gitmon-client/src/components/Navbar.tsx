import Image from 'next/image'
import gitmonLogo from '@assets/gitmon.svg'
import React from 'react'
import Link from 'next/link'
import { SquarePenIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Button } from './ui'
import { cookies } from 'next/headers'
import { LogoutButton } from './LogoutButton'

const Navbar = async () => {
  return (
    <header className="mb-16">
      <nav className="flex justify-between items-center fixed top-0 left-0 px-12 py-3 w-screen bg-transparent backdrop-blur z-50">
        <Link href="/" className="flex gap-1 items-center">
          <Image src={gitmonLogo} alt="Gitmon logo" className="size-7" />
          <p className="font-bold text-[1.75rem]/7 font-serif">Gitmon</p>
        </Link>
        <MenuItems />
      </nav>
    </header>
  )
}

const MenuItems = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('github_token')?.value

  if (!token) {
    return <div className="flex gap-1 items-center"></div>
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1/member`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  const { data } = await res.json()
  const username = data?.githubUsername

  return (
    <div className="flex gap-1 items-center">
      <Link href="/create-post" aria-label="Create Post">
        <Button variant="ghost">
          새글 작성
          <SquarePenIcon />
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full size-fit p-0">
            <Avatar>
              <AvatarImage src={`https://github.com/${username}.png`} alt={`@${username}`} />
              <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Navbar
