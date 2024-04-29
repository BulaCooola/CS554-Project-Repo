export { default } from "next-auth/middleware";

export const config = {
  pages: {
    signIn: "/login",
    error: "/error",
  },
  matcher: ["/profile"],
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
