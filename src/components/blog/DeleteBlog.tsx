"use client";

import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { buttonVariants } from "../ui/button";
import { cn, ResponseExceptions } from "@/lib/utils";
import { deleteBlog } from "@/utils/actions/blog";
import { reFetchBlog } from "@/utils/server";

const DeleteBlog = ({ blogId }: { blogId: string }) => {
  const router = useRouter();
  const handleDeleteBlog = async () => {
    try {
      await deleteBlog(blogId);
      toast.success("Xóa bài viết thành công");
      await reFetchBlog();
      router.push("/blog");
    } catch (error) {
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ variant: "destructive" }))}>
        Xóa
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Xóa bài viết</DialogTitle>
        <DialogDescription>
          Bạn có chắc rằng muốn xóa bài viết này, một khi xóa sẽ không thể khôi
          phục lại như ban đầu
        </DialogDescription>
        <DialogFooter>
          <DialogClose
            className={cn(buttonVariants())}
            onClick={handleDeleteBlog}
          >
            Xác nhận
          </DialogClose>
          <DialogClose
            className={cn(buttonVariants({ variant: "destructive" }))}
          >
            Hủy
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBlog;
