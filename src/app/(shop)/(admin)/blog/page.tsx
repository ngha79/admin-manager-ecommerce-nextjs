import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import ListBlog from "./_component/ListBlog";
import ListSubject from "./_component/ListSubject";
import { buttonVariants } from "@/components/ui/button";

const Blog = async ({ searchParams }: { searchParams: { page: string } }) => {
  return (
    <section className="container py-4 space-y-4">
      <ListSubject />
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Danh sách bài viết</h1>
        <Link href={"/blog/create"} className={cn(buttonVariants())}>
          <Plus size={16} className="mr-1" />
          Thêm bài viết mới
        </Link>
      </div>
      <ListBlog searchParams={searchParams} />
    </section>
  );
};

export default Blog;
