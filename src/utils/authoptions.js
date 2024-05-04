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
        email: { label: "Email", placeholder: "Enter Email" },
        password: { label: "Password", placeholder: "Enter Password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.email || !credentials.password) {
            throw `Either email or password was not provided`;
          }
          const user = await userData.loginUser(credentials.email, credentials.password);

          if (user.error) {
            throw `${user.error}`;
          }
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authentication error:", error);
          throw `Failed to authenicate user`;
        }
      },
    }),
    // Google, Discord
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      // console.log("jwt callback", { token, user, session });
      //   update session
      if (trigger === "update" && session?.user) {
        console.log("session updating trigger")
        return {...token,...session?.user}
      }
      //console.log(token);
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
    async session({ session, token, trigger, newSession }) {
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
