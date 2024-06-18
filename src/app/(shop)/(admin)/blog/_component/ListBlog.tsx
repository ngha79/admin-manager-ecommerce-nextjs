import React from "react";

import BlogIntro from "./BlogIntro";
import PaginationBlog from "./PaginationBlog";
import { getListBlog } from "@/utils/actions/blog";

const ListBlog = async ({
  params,
  searchParams,
}: {
  params?: { topic?: string; author?: string };
  searchParams: { page: string };
}) => {
  let blogs = null;
  try {
    const response = await getListBlog({
      page: searchParams.page,
      topic: params?.topic,
      author: params?.author,
    });
    blogs = response.payload;
  } catch (error) {
    return null;
  }
  if (!blogs) return null;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {blogs?.data?.map((blog: any) => (
          <BlogIntro blog={blog} key={blog.id} />
        ))}
      </div>
      <PaginationBlog searchParams={searchParams} listPage={blogs} />
    </>
  );
};

export default ListBlog;
