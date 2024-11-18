import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma'


export async function GET() {
  const users = await prisma.user.findMany({ orderBy: { name: 'asc' } })

  return NextResponse.json(users);
};