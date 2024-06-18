"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import http from "@/lib/http";
import { reFetchTag } from "@/utils/server";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn, ResponseExceptions } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const UpdateInventory = ({ inventory }: { inventory: any }) => {
  const [stock, setStock] = useState<number>(inventory.stock);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.valueAsNumber) < 1) {
      return setStock(0);
    }
    setStock(e.target.valueAsNumber);
  };

  const handleUpdateInventory = async () => {
    try {
      await http.patch(
        `/inventories/${inventory.id}`,
        {
          stock,
        },
        { token: true }
      );
      await reFetchTag("inventories");
      toast.success("Cập nhật kho hàng cho sản phẩm thành công");
    } catch (error) {
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full hover:bg-blue-500 hover:text-white cursor-pointer"
          )}
        >
          Cập nhật
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật sản phẩm</DialogTitle>
          <DialogDescription>
            Cập nhật, quản lý sản phẩm tốt hơn.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Ảnh
            </Label>
            <Image
              alt="image"
              src={inventory.productAttribute.picture}
              width="64"
              height="64"
              className="rounded-md"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Sản phẩm
            </Label>
            <Input
              id="name"
              defaultValue={inventory.product.name}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Trạng thái
            </Label>
            <Badge variant="outline">
              {inventory.product.isPublish ? "Active" : "Draft"}
            </Badge>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Sản phẩm còn lại
            </Label>
            <Input
              id="name"
              type="number"
              value={stock}
              onChange={handleOnChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Giá
            </Label>
            <Input
              id="username"
              defaultValue={inventory.product.price}
              disabled
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Đã bán
            </Label>
            <Input
              id="username"
              defaultValue={inventory.product.sold}
              disabled
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <div className="flex items-center justify-end gap-4">
            <DialogClose
              className={cn(buttonVariants())}
              onClick={handleUpdateInventory}
              type="submit"
            >
              Cập nhật
            </DialogClose>
            <DialogClose
              className={cn(buttonVariants({ variant: "destructive" }))}
            >
              Hủy
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateInventory;
