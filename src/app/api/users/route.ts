import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma'


export async function GET(){
    const users = await prisma.user.findMany({orderBy: {name:'asc'}})

    return NextResponse.json(users);
}

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name, email, image } = body

//     const existinUserEmail = await prisma.user.findUnique({
//       where: { email: email }
//     });
//     if (existinUserEmail) {
//       return NextResponse.json({ user: null, message: 'User with this email already exists' }, { status: 409 })
//     }

//     const newUser = await prisma.user.create({
//       data: {
//         name,
//         email,
//         image
//       }
//     })

//     return NextResponse.json({ user: newUser, message: 'User has been created' }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     return NextResponse.json(
//       { user: null, message: 'An error occurred while creating the user' },
//       { status: 500 }
//     );
//   }
// }