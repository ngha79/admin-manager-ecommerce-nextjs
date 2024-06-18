import DeleteBlog from "@/components/blog/DeleteBlog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getBlog } from "@/utils/actions/blog";
import { format } from "date-fns";
import { Dot } from "lucide-react";
import Link from "next/link";
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
  return (
    <div className="container py-8 space-y-4 px-20">
      <div className="flex items-center gap-4">
        <Link href={`/blog/update/${blog.id}`} className={cn(buttonVariants())}>
          Chỉnh sửa
        </Link>
        <DeleteBlog blogId={blog.id} />
      </div>
      <h1 className="text-4xl font-semibold line-clamp-2 break-all">
        {blog.title}
      </h1>
      <div className="flex items-center gap-1 flex-wrap text-sm font-medium">
        <span>{format(blog.createdAt, "dd/MM/yyyy")}</span>
        <Dot />
        <Link
          href={`/blog/topic/${blog.topic.topic}`}
          className="hover:underline"
        >
          {blog.topic.topic}
        </Link>
        <Dot />
        <Link href={`/blog/author/${blog.author}`} className="hover:underline">
          {blog.author}
        </Link>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: blog.description }}
        className="break-all"
      />
    </div>
  );
};

export default Page;
