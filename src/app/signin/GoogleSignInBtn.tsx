'use client'

import { Text, Button, Skeleton } from '@radix-ui/themes';
import { BsGoogle } from 'react-icons/bs';
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react';

const GoogleSignInBtn = () => {
  const { status, data: session } = useSession();
  return (
    <Skeleton loading={status === 'loading'}>
      <Button disabled={!!session} variant='solid' size='4' className=' w-full py-8 justify-center flex flex-row items-center cursor-pointer' onClick={() => signIn('google')}>
        <BsGoogle size={27} /> <Text size='5'>Sign in with Google</Text>
      </Button>
    </Skeleton>
  )
}

export default GoogleSignInBtn