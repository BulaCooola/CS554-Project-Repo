export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  pages: {
    signIn: "/login",
    error: "/error",
  },
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*), /profile",
    "/profile/edit",
    "/tournaments/create",
    "/tournaments/edit",
    "/teams/create",
    "/teams/edit",
  ],
};

export async function middleware(request) {
  const token = await getToken({ req: request });

  // If the user is authenticated, continue as normal
  if (token) {
    return NextResponse.next();
  }

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL("/login", request.url));
}
