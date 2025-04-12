import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from '@components/ui/navigation-menu'
import { HomeIcon, InfoIcon, ArchiveIcon, PenBoxIcon } from 'lucide-react'
import Image from 'next/image'
import gitmonLogo from '@assets/gitmon.svg'
import React from 'react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

interface MenuItemProps {
  href: string
  label: string
  Icon: React.ElementType
}

const MenuItem: React.FC<MenuItemProps> = ({ href, label, Icon }) => {
  return (
    <NavigationMenuItem>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavigationMenuLink
            href={href}
            className="flex items-center justify-center p-2 text-gray-500 hover:text-teal-400 transition-colors"
          >
            <Icon className="size-6" />
            <p className="sr-only">{label}</p>
          </NavigationMenuLink>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </NavigationMenuItem>
  )
}

const Navbar = async ({
  params,
}: {
  params: Promise<{
    id: string
    repo: string
  }>
}) => {
  const { id, repo } = await params

  const navList = [
    { href: '/home', label: 'Home', Icon: HomeIcon },
    { href: '/about', label: 'About', Icon: InfoIcon },
    { href: '/archive', label: 'Archive', Icon: ArchiveIcon },
  ]

  return (
    <NavigationMenu className="fixed top-0 left-0 w-16 h-screen flex flex-col items-center justify-start gap-6 p-4 bg-white border-r border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <Link
        href="https://github.com/ixfp/gitmon"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Image src={gitmonLogo} alt="Gitmon logo" className="size-10 mx-auto" />
      </Link>
      <NavigationMenuList className="flex flex-col items-center gap-6 mt-32">
        {navList.map(item => (
          <MenuItem key={item.href} href={item.href} label={item.label} Icon={item.Icon} />
        ))}
        <div className="w-full pt-2 border-t" />
        <MenuItem href={`/${id}/${repo}/create`} label="Create New Post" Icon={PenBoxIcon} />
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navbar
