export { default } from "next-auth/middleware";
import { encode } from "next-auth/jwt";

export const config = {
  pages: {
    signIn: "/login",
    error: "/error",
  },
  matcher: ["/profile", "/profile/edit", "/tournaments/create"],
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export const middleware = async (request, res) => {
  if (request.nextUrl.pathname.startsWith("/protected")) {
    const cookiesList = request.cookies.getAll();
    const sessionCookie = env.NEXTAUTH_URL.startsWith("https://")
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

    // no session token present, remove all next-auth cookies and redirect to sign-in
    if (!cookiesList.some((cookie) => cookie.name.includes(sessionCookie))) {
      const response = res.redirect(new URL("/sign-in", request.url));

      request.cookies.getAll().forEach((cookie) => {
        if (cookie.name.includes("next-auth")) response.cookies.delete(cookie.name);
      });

      return response;
    }

    // session token present, check if it's valid
    const session = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
      headers: {
        "content-type": "application/json",
        cookie: request.cookies.toString(),
      },
    });
    const json = await session.json();
    const data = Object.keys(json).length > 0 ? json : null;

    // session token is invalid, remove all next-auth cookies and redirect to sign-in
    if (!session.ok || !data?.user) {
      const response = res.redirect(new URL("/sign-in", request.url));

      request.cookies.getAll().forEach((cookie) => {
        if (cookie.name.includes("next-auth")) response.cookies.delete(cookie.name);
      });

      return response;
    }

    // session token is valid so we can continue
    const newAccessToken = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`); // or a server-side function call
    const response = res.next();
    const newSessionToken = await encode({
      secret: env.NEXTAUTH_SECRET,
      token: {
        ...otherTokenData,
        accessToken: newAccessToken,
      },
      maxAge: 30 * 24 * 60 * 60, // 30 days, or get the previous token's exp
    });

    // update session token with new access token
    response.cookies.set(sessionCookie, newSessionToken);

    return response;
  }

  return;
};
