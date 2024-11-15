'use client'
import { Button, Skeleton, DropdownMenu } from '@radix-ui/themes';
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from "next/navigation";
import { MdSort } from "react-icons/md";


const SortPosts = () => {
  const { status, } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sortPosts') || '';

  const handleSort = (sortType: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortType === '') {
      params.delete('sortPosts'); //remove parameter if the sortType is an empty string
    } else {
      params.set('sortPosts', sortType);
    }
    router.push(`?${params.toString()}`);
  };

  const sortLabels: { [key: string]: string } = {
    date_desc: 'New',
    date_asc: 'Old',
    like_amount: 'Most Liked',
    author: 'User',
  };

  return (
    <DropdownMenu.Root modal={false}>
      <Skeleton loading={status === 'loading'}>
        <DropdownMenu.Trigger>
          <Button size='2' variant="outline" className='cursor-pointer'>
            {sortLabels[currentSort] || 'Sort'}
            <MdSort />
          </Button>
        </DropdownMenu.Trigger>
      </Skeleton >
      <DropdownMenu.Content>
        <DropdownMenu.Item className='cursor-pointer' color='gray' onSelect={() => handleSort('')}>
          Sort by :
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className='cursor-pointer' onSelect={() => handleSort('date_desc')}>
          New
        </DropdownMenu.Item>
        <DropdownMenu.Item className='cursor-pointer' onSelect={() => handleSort('date_asc')}>
          Old
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