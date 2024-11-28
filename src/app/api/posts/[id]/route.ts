import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../../prisma/prisma';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { AxiosError } from 'axios';
import { postSchema } from "@/app/components/validationSchema";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();

  const validationResult = postSchema.safeParse(body);

  if (!validationResult.success) {
    const errors = validationResult.error.errors.map(err => err.message);
    return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
  }

  if (!body.title || !body.content || !params.id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (post.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Wrong user' }, { status: 403 });
    }

    //get the current date
    const today = new Date();
    today.setHours(0, 0, 0, 0);//sets today to start of day

    // count the number of posts edited by the user today
    const postEditCount = await prisma.post.count({
      where: {
        authorId: session.user.id,
        updatedAt: {
          gte: today,
        },
      },
    });

    if (postEditCount >= 5) {
      return NextResponse.json({ error: 'Daily post edit limit reached' }, { status: 403 });
    }

    const updatePost = await prisma.post.update({
      where: { id: params.id },
      data: { title: body.title, content: body.content }
    })

    return NextResponse.json(updatePost, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    const axiosError = error as AxiosError<ErrorResponse>;
    return NextResponse.json({ error: 'Error deleting post', details: axiosError.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!params.id)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (post.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Wrong user' }, { status: 403 });
    }

    await prisma.post.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    const axiosError = error as AxiosError<ErrorResponse>;
    return NextResponse.json({ error: 'Error deleting post', details: axiosError.message }, { status: 500 });
  }
}