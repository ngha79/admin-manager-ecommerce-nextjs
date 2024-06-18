import { NextRequest, NextResponse } from "next/server";

export async function newToken(newToken: any) {
  const accessTokenExpires = 24 * 60 * 60;
  let response = NextResponse.next();
  response.cookies.set("accessToken", newToken.tokens.accessToken, {
    maxAge: accessTokenExpires,
    httpOnly: true,
    path: "/",
  });
  response.cookies.set("refreshToken", newToken.tokens.refreshToken, {
    maxAge: accessTokenExpires * 30,
    httpOnly: true,
    path: "/",
  });
  response.cookies.set("userId", newToken.user.id, {
    maxAge: accessTokenExpires * 30,
    httpOnly: true,
    path: "/",
  });
  return response;
}

export async function newTokenMiddleware(newToken: any, cookies: any) {
  const accessTokenExpires = 24 * 60 * 60;
  cookies.set("accessToken", newToken.tokens.accessToken, {
    maxAge: accessTokenExpires,
    httpOnly: true,
    path: "/",
  });
  cookies.set("refreshToken", newToken.tokens.refreshToken, {
    maxAge: accessTokenExpires * 30,
    httpOnly: true,
    path: "/",
  });
}

export async function logoutMiddleware(request: NextRequest) {
  let response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.delete("accessToken");
  response.cookies.delete("refreshToken");
  response.cookies.delete("userId");
  return response;
}
