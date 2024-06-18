"use client";

import http from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import { reFetchTag } from "@/utils/server";
import { X } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DeleteImageSliderButton = ({ image }: any) => {
  const handleDeleteImageSlider = async () => {
    try {
      await http.delete(`/admin/slider/${image.id}`, {});
      await reFetchTag("sliders");
      toast.success("Xóa ảnh thành công.");
    } catch (error) {
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-1 rounded-full hidden group-hover:block bg-gray-50 absolute top-2 right-2 hover:bg-red-500 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận xóa ảnh</DialogTitle>
          <DialogDescription>
            Một khi bạn nhấn xác nhận ảnh sẽ bị xóa mà không thể khôi phục lại.
          </DialogDescription>
        </DialogHeader>
        <DialogClose className="gap-4 flex items-center justify-end">
          <Button type="submit" onClick={handleDeleteImageSlider}>
            Xác nhận
          </Button>
          <Button type="submit" variant={"destructive"}>
            Hủy
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteImageSliderButton;
