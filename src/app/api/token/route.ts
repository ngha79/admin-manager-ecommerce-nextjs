import { REFRESH_TOKEN_ERROR_STATUS } from "@/lib/http";
import {
  getRefreshToken,
  refreshToken,
  setNewToken,
} from "@/utils/actions/account";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token = await getRefreshToken();
  if (!token) {
    return Response.json(
      { message: "Token not found!" },
      { status: REFRESH_TOKEN_ERROR_STATUS }
    );
  }
  const data = await refreshToken(token);
  const response = NextResponse.json(data);
  await setNewToken(data.tokens);
  return response;
}
