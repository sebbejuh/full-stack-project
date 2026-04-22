'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Avatar, Box, Container, Flex, Text, Button, Skeleton, DropdownMenu } from '@radix-ui/themes';
import { HomeIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { usePathname, useRouter } from 'next/navigation';
import classNames from 'classnames';
import { BsGoogle } from 'react-icons/bs';
import { useState } from 'react';

const NavBar = () => {
  const currentPath = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/', icon: <HomeIcon width='20' height='20' /> },
    { label: 'Posts App', href: '/posts' },
  ];

  return (
    <nav className='fixed top-0 z-10 border-b border-zinc-800 px-5 py-3 w-full' style={{ backgroundColor: '#1b1c1f' }}>
      <Container>
        <Flex justify='between' align='center' gap='3'>
          {/* Desktop Links */}
          <Flex align='center' gap='3' className='hidden md:flex'>
            <ul className='flex space-x-6'>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className={classNames({
                      'nav-link': true,
                      '!text-white underline underline-offset-4': link.href === currentPath,
                    })}>
                    <span className='flex items-center gap-2'>
                      {link.icon}
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>

          {/* AuthStatus - Mobile - left side */}
          <div className='flex md:hidden'>
            <AuthStatus />
          </div>

          {/* Mobile Menu */}
          <div className='flex md:hidden'>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='p-2 text-zinc-200 hover:text-white'
            >
              <HamburgerMenuIcon width='24' height='24' />
            </button>

            {mobileMenuOpen && (
              <div className='fixed top-16 left-0 right-0 w-full bg-zinc-900 border-t border-zinc-700 shadow-lg py-0 z-20'>
                <Container>
                  <div className='flex flex-col items-center'>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className='flex justify-center w-full px-6 py-4 text-base hover:bg-zinc-800 transition-colors rounded border-b border-zinc-700'
                      >
                        <span className='flex items-center gap-2 text-lg'>
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </Container>
              </div>
            )}
          </div>

          {/* AuthStatus - Desktop - right side */}
          <div className='hidden md:flex'>
            <AuthStatus />
          </div>
        </Flex>
      </Container>
    </nav>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (status === 'unauthenticated' || !session || !session.user)
    return (
      <Skeleton loading={status === 'loading'}>
        <Link className='flex flex-row items-center gap-2	' href={'/signin'}>
          <Button size='2' variant="solid" className='cursor-pointer'> <BsGoogle size={17} />Sign In</Button>
        </Link>
      </Skeleton>
    );
  return (
    <Box>
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
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
          <DropdownMenu.Item onSelect={() => handleNavigation('/account')} className='cursor-pointer'>
            My Account
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => handleNavigation('/api/auth/signout')} className='cursor-pointer'>
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar