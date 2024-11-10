import authOptions from "@/app/auth/authOptions";
import prisma from '../../../../prisma/prisma'
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();

  if (!body.postId) {
    return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
  }

  const userId = session.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Invalid user" }, { status: 404 });
  }

  try {
    const newLike = await prisma.like.create({
      data: { postId: body.postId, userId: userId, },
    });

    return NextResponse.json(newLike, { status: 201 });
  } catch (error) {
    console.error('Error creating like:', error);
    return NextResponse.json({ error: 'Error liking post' }, { status: 500 });
  }
}