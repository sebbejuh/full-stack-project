'use client'
import Skeleton from '@/app/components/Skeleton'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, Box, Container, DropdownMenu, Flex, Text, Badge } from '@radix-ui/themes';
import { HomeIcon } from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { BsGoogle } from "react-icons/bs";


const NavBar = () => {
  return (
    <nav className='border-b border-zinc-800 px-5 py-3' style={{ backgroundColor: '#d8f4f609' }}>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <HomeIcon width='18' height='18' />
            </Link>
            <NavLinks />
          </Flex>
          <Flex>
            <AuthStatus />
          </Flex>
        </Flex>
      </Container>
    </nav>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === 'loading') return <Skeleton width='1.8rem' height='1.8rem' />;
  if (status === 'unauthenticated' || !session || !session.user)
    return (
      <Link className='flex flex-row items-center gap-2	' href={'/api/auth/signin'}>
        <Badge size='3' variant="solid"> <BsGoogle size={17} />Login</Badge>
      </Link>
    );
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback='?'
            size='2'
            radius='full'
            className='cursor-pointer'
            referrerPolicy='no-referrer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size='2'>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href={'/api/auth/signout'}>Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Posts', href: '/posts' },
  ];
  return (
    <ul className='flex space-x-6'>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              'nav-link': true,
              '!text-white underline underline-offset-4': link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar