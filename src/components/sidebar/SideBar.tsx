"use client";

import React from "react";
import { Button, buttonVariants } from "../ui/button";
import {
  AlignJustify,
  BellRing,
  Book,
  Database,
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
import { cn } from "@/lib/utils";
import { Icons } from "../navbar/Icons";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="min-w-64 max-lg:hidden">
      <div className="fixed top-0 left-0 bg-background z-30 h-screen flex flex-col gap-4 p-4 w-64">
        <Link href={"/"} className="flex items-center justify-center gap-2 p-2">
          <Icons.logo className="w-10 h-10" />
          <span className="text-lg font-bold">ShopDEV</span>
        </Link>
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

        <div className="flex flex-col gap-2 p-4">
          <h1 className="text-lg font-semibold">Sản phẩm</h1>
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
        </div>
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
      </div>
    </div>
  );
};

export default SideBar;
