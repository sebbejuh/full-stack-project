'use client'
import { IconButton, Skeleton, Text } from '@radix-ui/themes';
import { AiOutlineLike } from "react-icons/ai";
import { useSession } from 'next-auth/react';

const LikePostBtn = () => {
  const { status, data: session } = useSession();

  return (
    <Skeleton loading={status === 'loading'}>
      <IconButton variant="solid" className='hover:cursor-pointer w-full px-2 gap-1' disabled={!session}>
        <AiOutlineLike />
        <Text size='1' >Like</Text>
      </IconButton>
    </Skeleton >
  )
}

export default LikePostBtn