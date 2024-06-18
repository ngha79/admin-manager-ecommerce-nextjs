import http from "@/lib/http";
import { getSession } from "./account";
import { IResponsePagination } from "../types/response-pagination";
import { IUser } from "../types/user";

export const getListUsers = async ({
  page = 1,
  limit = 20,
  search = "",
}: {
  page: number;
  limit: number;
  search?: string;
}) => {
  return await http.get<IResponsePagination>(
    `/users?page=${page}&limit=${limit}&search=${search}`,
    {
      next: {
        tags: ["users"],
      },
    }
  );
};

export const deleteUser = async ({ userId }: { userId: string }) => {
  const res = await http.delete(
    `/users/${userId}`,
    {},
    {
      token: true,
    }
  );
  return res;
};

export const createUser = async (data: any) => {
  const res = await http.post(`/users`, data, {
    token: true,
  });
  return res;
};

export const getProfileUser = async (userId: string) => {
  const res = await http.get<IUser>(`/users/${userId}`, {
    cache: "no-store",
  });
  return res;
};

export const updateProfileUserByAdmin = async (
  userId: string,
  formData: any
) => {
  const res = await http.put(`/users/${userId}`, formData, {
    token: true,
  });
  return res;
};
