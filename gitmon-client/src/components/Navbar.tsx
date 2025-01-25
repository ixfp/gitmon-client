import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@components/components/ui/navigation-menu";

interface MenuItemProps {
  href: string;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, label }) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        href={href}
        className="font-medium text-sm hover:text-teal-400"
      >
        {label}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const Navbar = () => {
  const navList = [
    { href: "/", label: "Home" },
    { href: "/", label: "About" },
    { href: "blog", label: "Blog" },
    { href: "/", label: "Projects" },
    { href: "/", label: "Archive" },
  ];
  return (
    <nav>
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4 font-medium text-sm">
            {navList.map((item) => (
              <MenuItem key={item.href} href={item.href} label={item.label} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
