'use client'
import { Button, Skeleton, DropdownMenu } from '@radix-ui/themes';
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from "next/navigation";
import { MdSort } from "react-icons/md";


const SortPosts = () => {
  const { status, } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sortPosts') || 'date_desc';

  const handleSort = (sortType: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortPosts', sortType);
    router.push(`?${params.toString()}`);
  };

  const sortLabels: { [key: string]: string } = {
    date_desc: 'Latest',
    date_asc: 'Oldest',
    like_amount: 'Most Liked',
    author: 'User',
  };

  return (
    <DropdownMenu.Root modal={false}>
      <Skeleton loading={status === 'loading'}>
        <DropdownMenu.Trigger>
          <Button size='2' color="gray" variant="outline" highContrast className='cursor-pointer'>
            {sortLabels[currentSort] || 'Latest'}
            <MdSort />
          </Button>
        </DropdownMenu.Trigger>
      </Skeleton >
      <DropdownMenu.Content>
        <DropdownMenu.Label className='cursor-pointer'>
          Sort by :
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className='cursor-pointer' onSelect={() => handleSort('date_desc')}>
          Latest
        </DropdownMenu.Item>
        <DropdownMenu.Item className='cursor-pointer' onSelect={() => handleSort('date_asc')}>
          Oldest
        </DropdownMenu.Item>
        <DropdownMenu.Item className='cursor-pointer' onSelect={() => handleSort('like_amount')}>
          Most Liked
        </DropdownMenu.Item>
        <DropdownMenu.Item className='cursor-pointer' onSelect={() => handleSort('author')}>
          User
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
export default SortPosts