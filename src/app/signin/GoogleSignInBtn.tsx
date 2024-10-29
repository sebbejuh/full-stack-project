'use client'
import { useState } from 'react';
import { Text, Button, Skeleton } from '@radix-ui/themes';
import { BsGoogle } from 'react-icons/bs';
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const GoogleSignInBtn = () => {
  const { status, data: session } = useSession();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signIn('google', { callbackUrl });
    } finally {
      setIsSigningIn(false);
    }
  };
  return (
    <Skeleton loading={status === 'loading'}>
      <Button disabled={!!session || isSigningIn} variant='solid' size='4' className=' w-full py-8 justify-center flex flex-row items-center cursor-pointer' onClick={handleSignIn}>
        <BsGoogle size={27} /> <Text size='5'>Sign in with Google</Text>
      </Button>
    </Skeleton>
  )
}

export default GoogleSignInBtn