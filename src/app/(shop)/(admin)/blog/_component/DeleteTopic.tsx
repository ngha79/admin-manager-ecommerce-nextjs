"use client";

import { Trash } from "lucide-react";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { HttpError } from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { deleteTopic } from "@/utils/actions/blog";
import { reFetchTag } from "@/utils/server";

const DeleteTopic = ({ id }: { id: any }) => {
  const onDelete = async (e: { preventDefault: () => void }) => {
    try {
      await deleteTopic(id);
      await reFetchTag("topics");
      toast.success("Xóa chủ đề thành công thành công.");
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.payload.message);
      } else {
        toast.error(ResponseExceptions.DEFAULT_ERROR);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 group-hover:bg-destructive group-hover:block hidden group-hover:text-white rounded-md">
          <Trash size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xóa chủ đề</DialogTitle>
          <DialogDescription>
            Bạn có chắc muốn xóa chủ đề này. Nếu nhấn đồng ý, tất cả bài viết
            của chủ đề này cũng sẽ bị xóa
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogTrigger>
            <Button variant={"destructive"} onClick={onDelete}>
              Đồng ý
            </Button>
          </DialogTrigger>
          <DialogTrigger>
            <Button type="button" variant={"primary"}>
              Hủy
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTopic;
