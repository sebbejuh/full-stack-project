import authOptions from "@/app/auth/authOptions";
import prisma from '../../../../prisma/prisma'
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from 'axios';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();

  if (!body.postId) {
    return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
  }

  const userId = session.user.id;

  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    return NextResponse.json({ error: "Invalid user" }, { status: 404 });
  }

  //get the current date
  const today = new Date();
  today.setHours(0, 0, 0, 0);//sets today to start of day

  // count the number of likes created by the user today
  const likeCount = await prisma.like.count({
    where: {
      userId: userId,
      createdAt: {
        gte: today,
      },
    },
  });

  if (likeCount >= 10) {
    return NextResponse.json({ error: 'Daily like limit reached' }, { status: 403 });
  }

  try {
    const newLike = await prisma.like.create({
      data: { postId: body.postId, userId: userId, },
    });

    return NextResponse.json(newLike, { status: 201 });
  } catch (error) {
    console.error('Error creating like:', error);
    const axiosError = error as AxiosError<ErrorResponse>;
    return NextResponse.json({ error: 'Error liking post', details: axiosError.message }, { status: 500 });
  }
}