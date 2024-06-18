import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ListBlog from "../../_component/ListBlog";

const Blog = async ({
  params,
  searchParams,
}: {
  params: { topic: string };
  searchParams: { page: string };
}) => {
  return (
    <section className="container py-4 space-y-4">
      <Link href={"/blog"} className={cn(buttonVariants())}>
        Quay lại
      </Link>
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Danh sách bài viết</h1>
        <Link href={"/blog/create"} className={cn(buttonVariants())}>
          <Plus size={16} className="mr-1" />
          Thêm bài viết mới
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"></div>
      <ListBlog searchParams={searchParams} params={params} />
    </section>
  );
};

export default Blog;
