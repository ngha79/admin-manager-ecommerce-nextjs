import UpdateBlog from "@/components/blog/update/UpdateBlog";
import { getBlog } from "@/utils/actions/blog";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  let blog = null;
  try {
    const response = await getBlog(params.id);
    blog = response.payload;
  } catch (error) {
    throw new Error();
  }
  if (!blog) return notFound();
  return <UpdateBlog blog={blog} />;
};

export default Page;
