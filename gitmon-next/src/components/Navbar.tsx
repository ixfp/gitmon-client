import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@components/ui/navigation-menu";
import { HomeIcon, InfoIcon, ArchiveIcon, PenBoxIcon } from "lucide-react";
import Image from "next/image";
import gitmonLogo from "@assets/gitmon.svg";
import React from "react";
import Link from "next/link";

interface MenuItemProps {
  href: string;
  label: string;
  Icon: React.ElementType;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, label, Icon }) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href={href}
        /* 
          flex-col / flex-row / 어떤 형태든 가능. 
          단순 아이콘만 보여주려면 justify-center 
          + hover 시 색상 변경 등을 추가 
        */
        className="
          flex
          items-center
          justify-center
          p-2
          text-gray-500
          hover:text-teal-400
          transition-colors
        "
      >
        {/* Icon 표시 */}
        <Icon className="w-6 h-6" />
        {/* 라벨 숨김 → 접근성 위해 sr-only 적용 권장 */}
        <p className="hidden">{label}</p>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const Navbar = () => {
  const navList = [
    { href: "/home", label: "Home", Icon: HomeIcon },
    { href: "/about", label: "About", Icon: InfoIcon },
    { href: "/archive", label: "Archive", Icon: ArchiveIcon },
  ];

  return (
    <NavigationMenu
      /*
        사이드바의 핵심: 
        - 고정(fixed) 위치
        - 화면 전체 높이(h-screen)
        - 가로 폭(w-16 or w-24 등)
        - 세로 정렬 flex-col
      */
      className="
        fixed
        top-0
        left-0
        w-16
        h-screen
        flex
        flex-col
        items-center
        justify-start
        gap-6
        p-4
        bg-white
        border-r
        border-gray-200
        dark:border-gray-700
        dark:bg-gray-900
      "
    >
      <Link
        href="https://github.com/ixfp/gitmon"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Image src={gitmonLogo} alt="Gitmon logo" className="size-10 mx-auto" />
      </Link>
      <NavigationMenuList
        className="
          flex
          flex-col
          items-center
          gap-6
          mt-32
        "
      >
        {navList.map((item) => (
          <MenuItem
            key={item.href}
            href={item.href}
            label={item.label}
            Icon={item.Icon}
          />
        ))}
        <div className="w-full pt-2 border-t" />
        <MenuItem href="/write" label="Write" Icon={PenBoxIcon} />
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
