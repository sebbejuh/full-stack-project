'use client'
import { Button, Skeleton, DropdownMenu } from '@radix-ui/themes';
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from "next/navigation";

const SortPosts = () => {
  const { status, } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = (sortType: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortPosts', sortType);
    router.push(`?${params.toString()}`);
  };

  return (
    <DropdownMenu.Root modal={false}>
      <Skeleton loading={status === 'loading'}>
        <DropdownMenu.Trigger>
          <Button size='2' variant="outline" className='cursor-pointer'>
            Sort By
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
      </Skeleton >
      <DropdownMenu.Content>
        <DropdownMenu.Item className='cursor-pointer' onSelect={() => handleSort('date_desc')}>
          Latest
        </DropdownMenu.Item>
        <DropdownMenu.Item className='cursor-pointer' onSelect={() => handleSort('date_asc')}>
          Oldest
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
export default SortPosts