import { usePathname } from 'next/navigation';

import {BookMarked, Home, Layers, Settings, User } from 'lucide-react';

export const NavItems = () => {
  const pathname = usePathname();

  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    {
      name: 'Home',
      href: '/home',
      icon: <Home size={20} />,
      active: pathname === '/home',
      position: 'top',
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: <User size={20} />,
      active: isNavItemActive(pathname, '/profile'),
      position: 'top',
    },
    {
      name: 'Group',
      href: '/groups',
      icon: <Layers size={20} />,
      active: isNavItemActive(pathname, '/groups'),
      position: 'top',
    },
    {
      name: 'Activties',
      href: '/activties',
      icon: <BookMarked size={20} />,
      active: isNavItemActive(pathname, '/activties'),
      position: 'top',
    },
    
    {
      name: 'Settings',
      href: '/settings',
      icon: <Settings size={20} />,
      active: isNavItemActive(pathname, '/settings'),
      position: 'bottom',
    },

  ];
};