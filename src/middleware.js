import { withAuth } from "next-auth/middleware";

// export const config = {
//   matcher: ["/profile"],
//   // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
// };

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/login",
    error: "/error",
  },
});
