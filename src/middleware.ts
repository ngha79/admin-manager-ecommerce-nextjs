import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { refreshToken } from "./utils/actions/account";
import { logoutMiddleware, newToken } from "./utils/actions/cookies";

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const { pathname } = nextUrl;
  const urlAuth = ["/login", "/register", "/verify"];
  const routeAuthentication = urlAuth.some((url) => pathname.startsWith(url));
  const isLoggin = cookies.get("refreshToken");
  const accessToken = cookies.get("accessToken");
  if (routeAuthentication) {
    if (isLoggin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!routeAuthentication) {
    if (!isLoggin) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (isLoggin && !accessToken) {
      try {
        const tokens = await refreshToken(isLoggin.value);
        return await newToken(tokens);
      } catch (error) {
        return await logoutMiddleware(request);
      }
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
