export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard"],
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
