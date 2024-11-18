import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../../prisma/prisma';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!params.id)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  try {
    const like = await prisma.like.findUnique({
      where: { id: params.id },
    });

    if (!like) {
      return NextResponse.json({ error: 'Like not found' }, { status: 404 });
    }

    if (like.userId !== session.user.id) {
      return NextResponse.json({ error: 'Wrong user' }, { status: 403 });
    }

    await prisma.like.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Like deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting like', details: error }, { status: 500 });
  }
}