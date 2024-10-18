import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../../prisma/prisma';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  const body = await req.json();
  const { postId } = body;

  if (!postId)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (post.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Wrong user' }, { status: 403 });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting post', details: error }, { status: 500 });
  }

}