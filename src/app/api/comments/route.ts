import authOptions from "@/app/auth/authOptions";
import prisma from '../../../../prisma/prisma'
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { commentSchema } from "@/app/components/validationSchema";
import { AxiosError } from 'axios';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
  const content = body.content

  const validationResult = commentSchema.safeParse({ content });

  if (!validationResult.success) {
    const errors = validationResult.error.errors.map(err => err.message);
    return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
  }

  if (!body.postId || !body.content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const userId = session.user.id;

  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user)
    return NextResponse.json({ error: "Invalid user" }, { status: 404 })

  //get the current date
  const today = new Date();
  today.setHours(0, 0, 0, 0);//sets today to start of day

  // count the number of comments created by the user today
  const commentCount = await prisma.comment.count({
    where: {
      authorId: userId,
      createdAt: {
        gte: today,
      },
    },
  });

  if (commentCount >= 10) {
    return NextResponse.json({ error: 'Daily comment limit reached' }, { status: 403 });
  }

  try {
    const newComment = await prisma.comment.create({
      data: { content: body.content, postId: body.postId, authorId: userId, },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    const axiosError = error as AxiosError<ErrorResponse>;
    return NextResponse.json({ error: 'Error creating comment', details: axiosError.message }, { status: 500 });
  }
}