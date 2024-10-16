'use client'
import * as Form from '@radix-ui/react-form';
import axios from 'axios';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Skeleton from '@/app/components/Skeleton';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button, Flex } from '@radix-ui/themes';
import { postSchema } from '../components/validationSchema';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { status, data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    setIsSubmitting(true)
    setError('')
    event.preventDefault();

    if (!session) {
      toast.error('You are not logged in.');
      setIsSubmitting(false)
      return;
    }

    const validationResult = postSchema.safeParse({ title: title, content: content });

    if (!validationResult.success) {
      let errorMessage = '';
      validationResult.error.issues.forEach((issue) => {
        errorMessage = errorMessage + issue.message + '. ';
      })

      console.log(errorMessage)
      toast.error('Failed to post.')
      setError(errorMessage)
      setIsSubmitting(false)
      return;
    }

    if (!session.user) {
      toast.error('User error.')
      toast.error('Please logout & in again.')
      return
    }

    try {
      await axios.post('/api/posts', {
        title,
        content,
        userId: session.user.id,
      });

      toast.success('Post Created!')
      setTitle('');
      setContent('');
      setIsSubmitting(false)
      router.push("/posts");
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
      toast.error(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`)
      setIsSubmitting(false)
    }
  }

  if (status === 'loading') return <Skeleton height='15rem' width='25vw' />;
  return (
    <Form.Root className=' max-w-[600px] w-full' style={{ display: 'block', width: '100%', maxWidth: '600px' }} onSubmit={handleSubmit}>
      <Form.Field className='grid max-w-[600px] w-full' name='title'>
        <div className='flex items-baseline justify-between'>
          <Form.Label className='text-[15px] font-medium leading-[35px] text-black'>
            Title
          </Form.Label>
          <Form.Message
            className='text-[13px] text-red-600  opacity-80'
            match='valueMissing'
          >
            Please enter a title
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className='box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[12px] leading-none text-black shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]'
            type='text'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Control>
        <Form.Message className={`text-[12px] ${title.length > 140 ? 'text-red-600' : 'text-black-600'} opacity-80 justify-self-end pt-0.5`}>
          {title.length} / 140
        </Form.Message>
      </Form.Field>
      <Form.Field className='mb-2.5 grid max-w-[600px] w-full' name='content'>
        <div className='flex items-baseline justify-between'>
          <Form.Label className='text-[15px] font-medium leading-[35px] text-black'>
            Content
          </Form.Label>
          <Form.Message
            className='text-[13px] text-red-600  opacity-80'
            match='valueMissing'
          >
            Please enter content
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea
            className='box-border inline-flex w-full h-[175px] md:h-[95px] leading-snug resize-none appearance-none items-center justify-center rounded bg-blackA2 p-2.5 text-[13px] leading-none text-black shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]'
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Control>
        <Form.Message className={`text-[12px] ${content.length > 280 ? 'text-red-600' : 'text-black-600'} opacity-80 justify-self-end pt-0.5`}>
          {content.length} / 280
        </Form.Message>
        {error && (
          <Form.Message className='text-[12px] text-red-600 opacity-80 pt-0.5'>
            {error}
          </Form.Message>
        )}
      </Form.Field>
      <Form.Submit asChild>
        <Flex justify='end'>
          <Button disabled={isSubmitting} color={isSubmitting ? 'gray' : 'indigo'} className='w-full hover:cursor-pointer max-w-[200px]'>
            Add Post
          </Button>
        </Flex>

      </Form.Submit>
    </Form.Root>
  )
}

export default PostForm