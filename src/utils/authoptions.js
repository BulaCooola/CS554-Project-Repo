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
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token._id = user._id;
        token.email = user.email;
        token.profilePicture = user.profilePicture;
        token.phone = user.phone;
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // console.log("session callback", { token, user, session });
      session.user.id = token._id;
      session.user.profilePicture = token.profilePicture;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.phone = token.phone;
      return session;
    },
  },
};
