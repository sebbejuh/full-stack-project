'use client'
import * as Form from "@radix-ui/react-form";
import axios from 'axios';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import Skeleton from "@/app/components/Skeleton";
import { useRouter } from 'next/navigation';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { status, data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!session) {
      setError('You are not logged in.');
      return;
    }

    try {
      const response = await axios.post('/api/posts', {
        title,
        content,
        userId: session.user?.id, 
      });

      console.log('Post created:', response.data);
      
      setTitle('');
      setContent('');
      router.refresh();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  if(error) console.log(error)  //TODO more error handling, use toast or something, maybe zod validation here aswell as in api?
  if (status === "loading") return <Skeleton height="13rem" width="13rem" />;
  return (
    <Form.Root className="w-[260px]" onSubmit={handleSubmit}>
      <Form.Field className="grid" name="email">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
            Title
          </Form.Label>
          <Form.Message
            className="text-[13px] text-red-600  opacity-80"
            match="valueMissing"
          >
            Please enter a title
          </Form.Message>
          <Form.Message
            className="text-[13px] text-red-600 opacity-80"
            match="typeMismatch"
          >
            Please provide a valid title
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[12px] leading-none text-black shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="mb-2.5 grid" name="content">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
            Content
          </Form.Label>
          <Form.Message
            className="text-[13px] text-red-600  opacity-80"
            match="valueMissing"
          >
            Please enter content
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea
            className="box-border inline-flex w-full h-[95px] resize-none appearance-none items-center justify-center rounded bg-blackA2 p-2.5 text-[10px] leading-none text-black shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button className="mt-2.5 box-border inline-flex h-[35px] w-full items-center justify-center rounded bg-white px-[15px] font-medium leading-none text-black shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          Add Post
        </button>
      </Form.Submit>
    </Form.Root>
  )
}

export default PostForm