import authOptions from "@/app/auth/authOptions";
import prisma from '../../../../prisma/prisma'
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();
// TODO add zod validation
  if (!body.title || !body.content || !body.userId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: body.userId } })

  if (!user)
    return NextResponse.json({ error: "Invalid user" }, { status: 404 })

  try {
    const newPost = await prisma.post.create({
      data: { title: body.title, content: body.content, authorId: body.userId, },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}