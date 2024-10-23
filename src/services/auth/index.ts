import { signOut } from 'next-auth/react';
import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { prisma } from "../database"
import { UserRepository } from "../repositories/UserRepository"
import { cookies } from "next/headers"
import { COOKIES_NAME } from '@/lib/config';

const _userRepository = new UserRepository();

export const { handlers, auth } = NextAuth({
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
    newUser: "/app"
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const userData = await _userRepository.getUserByUsernameAndPassword(
          credentials.username as string,
          credentials.password as string
        );

        if (userData) {
          return {
            id: userData.id.toString(),
            name: userData.name,
            email: userData.email,
            role: userData.role,
            company: userData.company
          } satisfies User;
        }

        return null;
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if(user) {
        token.role = user.role;
        token.company = user.company;
      }

      return token;
    },
    
    async session({ session, token }: any) {
      if(token && session.user) {
        session.user.role = token.role;
        session.user.company = token.company;
      }

      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 4 * 60 * 60 // 4 hours
  },
})