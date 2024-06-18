"use server";

import { cookies } from "next/headers";
import { newToken } from "./cookies";

export async function login(tokens: any) {
  const expires = 24 * 60 * 60;
  const cookieStore = cookies();
  cookieStore.set("accessToken", tokens.accessToken, {
    maxAge: expires,
    httpOnly: true,
    path: "/",
  });
  cookieStore.set("refreshToken", tokens.refreshToken, {
    maxAge: expires * 30,
    httpOnly: true,
    path: "/",
  });
  cookieStore.set("userId", tokens.id, {
    maxAge: expires * 30,
    httpOnly: true,
    path: "/",
  });
  return tokens;
}

export async function setNewToken(tokens: any) {
  const expires = 24 * 60 * 60;
  const cookieStore = cookies();
  cookieStore.set("accessToken", tokens.accessToken, {
    maxAge: expires,
    httpOnly: true,
    path: "/",
  });
  cookieStore.set("refreshToken", tokens.refreshToken, {
    maxAge: expires * 30,
    httpOnly: true,
    path: "/",
  });
  return tokens;
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.set("accessToken", "", { expires: new Date(0) });
  cookieStore.set("userId", "", { expires: new Date(0) });
  cookieStore.set("refreshToken", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("accessToken")?.value;
  if (!session) return null;
  return session;
}

export async function getRefreshToken() {
  const session = cookies().get("refreshToken")?.value;
  if (!session) return null;
  return session;
}

export async function getUserId() {
  const session = cookies().get("userId")?.value;
  if (!session) return "";
  return session;
}

export async function decrypt(session: string) {
  return await JSON.parse(session);
}

export async function encrypt(session: string) {
  return await JSON.stringify(session);
}

export async function refreshToken(refreshToken: string | null) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/shop/refresh-token`,
    {
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      cache: "no-store",
    }
  );
  return response.json();
}

export const handleRefreshToken = async () => {
  const session = await getRefreshToken();
  const token = await refreshToken(session);
  if (token.tokens) {
    await newToken(token);
  }
  return token;
};
