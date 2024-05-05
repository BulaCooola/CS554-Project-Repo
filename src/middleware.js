export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export const config = {
  pages: {
    signIn: "/login",
    error: "/error",
  },
  // matcher: ["/profile", "/profile/edit", "/tournaments/create"],
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*), /profile",
    "/profile/edit",
    // "/tournaments/create",
    // "/tournaments/edit",
    //"/teams/create",
    //"/teams/edit",
  ],
};

export async function middleware(request) {
  const session = await getSession({ req: request });

  // If the user is authenticated, continue as normal
  if (session?.status === "authenticated") {
    return NextResponse.next();
  }

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL("/login", request.url));
}
