import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../../prisma/prisma';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { AxiosError } from 'axios';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!params.id)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: params.id },
    });

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    if (comment.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Wrong user' }, { status: 403 });
    }

    await prisma.comment.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Comment deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting comment:', error);
    const axiosError = error as AxiosError<ErrorResponse>;
    return NextResponse.json({ error: 'Error deleting comment', details: axiosError.message }, { status: 500 });
  }

}