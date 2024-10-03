import { NextAuthOptions } from "next-auth"
import prisma from "../../../prisma/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
          })
    ],
    callbacks: {
        session: async ({ session, token }) => {
          if (session.user) {
            session.user.id = token.sub!;
          }
            return session
        },
      },
    session:{
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions;