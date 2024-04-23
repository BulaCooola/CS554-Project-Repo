import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userData } from "@/data/index";
import validation from "@/data/validation";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { setCookie } from "next-cookies";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        // email: {label: "Emsail", placeholder: "Enter Email"},
        password: { label: "Password", placeholder: "Enter Password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            throw `Either email or password was not provided`;
          }
          const user = await userData.loginUser(
            credentials.email,
            credentials.password
          );
          if (!user) {
            throw `User does not exist`;
          }
          if (user.error) {
            throw `${user.error}`;
          }
          return user;
        } catch (error) {
          console.log(error);
          throw `${e}`;
        }
      },
    }),
    // Google, Discord
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      // console.log("jwt callback", { token, user, session });

      //   update session
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      // pass in _id and role
      if (user) {
        token.name = user.name;
        token._id = user._id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("session callback", { token, user, session });
      return {
        ...session,
        user: {
          ...session.user,
          _id: token._id,
          email: token.email,
          role: token.role,
        },
      };
    },
  },
};
