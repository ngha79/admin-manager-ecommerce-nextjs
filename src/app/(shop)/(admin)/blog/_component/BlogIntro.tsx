import { format } from "date-fns";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogIntro = ({ blog }: { blog: any }) => {
  return (
    <div className="flex flex-col gap-2 w-full p-4">
      <Link
        href={`/blog/${blog.id}`}
        className="w-full h-52 flex items-center bg-background shadow-sm border justify-center relative"
      >
        <Image alt="thumb" src={"/login.png"} fill className="object-cover" />
      </Link>
      <div className="flex items-center gap-1 flex-wrap text-sm font-medium">
        <span>{format(blog.createdAt, "dd/MM/yyyy")}</span>
        <Dot />
        <Link href={`/blog/${blog?.topic?.topic}`}>{blog?.topic?.topic}</Link>
        <Dot />
        <Link href={`/blog/author/${blog.author}`}>{blog.author}</Link>
      </div>
      <Link
        href={`/blog/${blog.id}`}
        className="text-lg font-semibold text-orange-500"
      >
        {blog.title}
      </Link>
      <div
        dangerouslySetInnerHTML={{ __html: blog.description }}
        className="break-all line-clamp-2"
      />
    </div>
  );
};

export default BlogIntro;
