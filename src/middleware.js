import { withAuth } from "next-auth/middleware";

export default withAuth({
  // matcher: ["/profile"],
  pages: {
    signIn: "/login",
    error: "/error",
  },
});
