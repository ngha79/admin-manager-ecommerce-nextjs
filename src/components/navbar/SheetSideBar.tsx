import {
  AlignJustify,
  BellRing,
  Book,
  Database,
  Menu,
  MessageCircle,
  Plus,
  ScrollText,
  SquarePen,
  Star,
  Store,
  Ticket,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Icons } from "./Icons";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const SheetSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="flex flex-col overflow-auto gap-4 p-4"
      >
        <SheetClose asChild>
          <Link
            href={"/"}
            className="flex items-center justify-center gap-2 p-2"
          >
            <Icons.logo className="w-10 h-10" />
            <span className="text-lg font-bold">ShopDEV</span>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href={"/shop"}
            className={cn([
              buttonVariants({ variant: "outline" }),
              "flex items-center justify-start gap-2 w-full",
            ])}
          >
            <Store size={18} />
            <span>Shops</span>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href={"/manage-web"}
            className={cn([
              buttonVariants({ variant: "outline" }),
              "flex items-center justify-start gap-2 w-full",
            ])}
          >
            <Store size={18} />
            <span>Quản lý trang web</span>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href={"/users"}
            className={cn([
              buttonVariants({ variant: "outline" }),
              "flex items-center justify-start gap-2 w-full",
            ])}
          >
            <Users size={18} />
            <span>Users</span>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href={"/orders"}
            className={cn([
              buttonVariants({ variant: "outline" }),
              "flex items-center justify-start gap-2 w-full",
            ])}
          >
            <ScrollText size={18} />
            <span>Orders</span>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href={"/messages"}
            className={cn([
              buttonVariants({ variant: "outline" }),
              "flex items-center justify-start gap-2 w-full",
            ])}
          >
            <MessageCircle size={18} />
            <span>Tin nhắn</span>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href={"/report"}
            className={cn([
              "flex items-center !justify-start gap-2 w-full",
              buttonVariants({ variant: "outline" }),
            ])}
          >
            <AlignJustify size={18} />
            <span>Danh sách báo cáo</span>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href={"/blog"}
            className={cn([
              "flex items-center !justify-start gap-2 w-full",
              buttonVariants({ variant: "outline" }),
            ])}
          >
            <Book size={18} />
            <span>Blog</span>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href={"/notifications"}
            className={cn([
              "flex items-center !justify-start gap-2 w-full",
              buttonVariants({ variant: "outline" }),
            ])}
          >
            <BellRing size={18} />
            <span>Thông báo</span>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href={"/vouchers"}
            className={cn([
              "flex items-center !justify-start gap-2 w-full",
              buttonVariants({ variant: "outline" }),
            ])}
          >
            <Ticket size={18} />
            <span>Mã giảm giá</span>
          </Link>
        </SheetClose>
        <div className="flex flex-col gap-2 p-4">
          <h1 className="text-lg font-semibold">Sản phẩm</h1>
          <SheetClose asChild>
            <Link
              href={"/product/list"}
              className={cn([
                "flex items-center !justify-start gap-2 w-full",
                buttonVariants({ variant: "ghost" }),
              ])}
            >
              <AlignJustify size={18} />
              <span>Danh sách sản phẩm</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/product/create"}
              className={cn([
                "flex items-center !justify-start gap-2 w-full",
                buttonVariants({ variant: "ghost" }),
              ])}
            >
              <Plus size={18} />
              <span>Thêm sản phẩm</span>
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              href={"/product/update"}
              className={cn([
                "flex items-center !justify-start gap-2 w-full",
                buttonVariants({ variant: "ghost" }),
              ])}
            >
              <SquarePen size={18} />
              <span>Cập nhật sản phẩm</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/product/inventory"}
              className={cn([
                "flex items-center !justify-start gap-2 w-full",
                buttonVariants({ variant: "ghost" }),
              ])}
            >
              <Database size={18} />
              <span>Kho hàng sản phẩm</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/product/reviews"}
              className={cn([
                "flex items-center !justify-start gap-2 w-full",
                buttonVariants({ variant: "ghost" }),
              ])}
            >
              <Star size={18} />
              <span>Đánh giá sản phẩm</span>
            </Link>
          </SheetClose>
        </div>
        <SheetClose asChild>
          <Link
            href={"/profile"}
            className={cn([
              buttonVariants({ variant: "outline" }),
              "flex items-center justify-start gap-2 w-full",
            ])}
          >
            <User size={18} />
            <span>Profile</span>
          </Link>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default SheetSideBar;
