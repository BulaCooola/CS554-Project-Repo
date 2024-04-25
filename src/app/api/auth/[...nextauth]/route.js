import NextAuth from "next-auth";
import { authOptions } from "@/utils/authoptions";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { userData } from "@/data/index";
// import validation from "@/data/validation";
// import jwt from "jsonwebtoken";
// import { compare } from "bcrypt";
// import { setCookie } from "next-cookies";

// Handle login options (authOptions is under the util)
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
