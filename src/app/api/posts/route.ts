import authOptions from "@/app/auth/authOptions";
import prisma from '../../../../prisma/prisma'
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { postSchema } from "@/app/components/validationSchema";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json();

  const validationResult = postSchema.safeParse(body);

  if (!validationResult.success) {
    const errors = validationResult.error.errors.map(err => err.message);
    return NextResponse.json({ error: 'Validation failed', details: errors }, { status: 400 });
  }

  if (!body.title || !body.content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const userId = session.user.id;

  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user)
    return NextResponse.json({ error: "Invalid user" }, { status: 404 })

  //get the current date
  const today = new Date();
  today.setHours(0, 0, 0, 0);//sets today to start of day

  // count the number of posts created by the user today
  const postCount = await prisma.post.count({
    where: {
      authorId: userId,
      createdAt: {
        gte: today,
      },
    },
  });

  if (postCount >= 10) {
    return NextResponse.json({ error: 'Daily post limit reached' }, { status: 403 });
  }

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