import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../../prisma/prisma';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { userId } = body;

  if (!userId)
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.id !== session.user.id) {
      return NextResponse.json({ error: 'Wrong user ID' }, { status: 403 });
    }

    if (user.email) {
      await prisma.verificationToken.deleteMany({
        where: { identifier: user.email },
      });
    }

    await prisma.user.delete({
      where: { id: userId },
      include: {
        accounts: true,
        sessions: true,
        posts: true,
        likes: true, //should cascade and be deleted with posts but might as well add them
        comments: true, //should cascade and be deleted with posts but might as well add them
      },
    });

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting user', details: error }, { status: 500 });
  }
}