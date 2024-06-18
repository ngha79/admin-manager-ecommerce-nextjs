import http from "@/lib/http";
import { IResponsePagination } from "../types/response-pagination";
import { TBlog } from "@/lib/interface";

export const getListTopicBlog = async () => {
  return await http.get<any[]>("/blog/topic", {
    next: {
      tags: ["topics"],
    },
  });
};

export const getListBlog = async ({
  page = "1",
  limit = "20",
  search = "",
  author = "",
  topic = "",
}: {
  page: string;
  limit?: string;
  search?: string;
  author?: string;
  topic?: string;
}) => {
  let url = "";
  if (author) url += `&author=${author}`;
  if (topic) url += `&topic=${topic}`;
  return await http.get<IResponsePagination>(
    `/blog?page=${page}&limit=${limit}&search=${search}` + url,
    {
      next: {
        tags: ["blogs"],
      },
    }
  );
};

export const getBlog = async (id: string) => {
  return await http.get<TBlog>(`/blog/${id}`, { cache: "no-store" });
};

export const createTopic = async (body: any) => {
  return await http.post("/blog/topic", body);
};

export const createBlog = async (body: any) => {
  return await http.post("/blog", body);
};

export const updateBlog = async (id: string, body: any) => {
  return await http.put(`/blog/${id}`, body);
};

export const deleteBlog = async (id: string) => {
  return await http.delete(`/blog/${id}`, {});
};

export const deleteTopic = async (id: number) => {
  return await http.delete(`/blog/topic/${id}`, {});
};

export const updateTopic = async (id: number, body: any) => {
  return await http.put(`/blog/topic/${id}`, body);
};
