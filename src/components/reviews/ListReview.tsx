"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { IResponsePagination } from "@/utils/types/response-pagination";

export interface IListComment {
  id: string;
  content: string;
  rating: number;
  createdAt: Date;
  user: {
    avatar: string;
    userName: string;
    id: string;
    email: string;
  };
  shopComment: [
    {
      id: string;
      createdAt: Date;
      content: string;
      images: [
        {
          image_id: string;
          image_url: string;
        }
      ];
      shop: {
        id: string;
        userName: string;
        email: string;
        avatar: string;
      };
    }
  ];
  commentImage: [
    {
      image_id: string;
      image_url: string;
    }
  ];
}

type OrderType = "recent" | "oldest" | "highest" | "lowest";

const ListReview = ({
  comments,
  children,
}: {
  comments: IResponsePagination;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleGetListComment = async (order: OrderType) => {
    const params = new URLSearchParams(searchParams);
    params.set("order", order);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const getReviewPrevPage = async () => {
    if (!comments.prevPage || comments.prevPage < 1) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", `${comments.prevPage}`);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const getReviewNextPage = async () => {
    if (!comments.nextPage || comments.nextPage > comments.lastPage) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", `${comments.nextPage}`);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-background rounded-md shadow-md">
      <div className="flex items-center justify-between px-8 py-4 border-b">
        <h1 className="text-2xl font-bold">Đánh giá mới nhất</h1>
        <Select
          defaultValue={"recent"}
          onValueChange={(value: OrderType) => handleGetListComment(value)}
        >
          <SelectTrigger className="w-[180px] font-medium">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent className="font-medium">
            <SelectGroup>
              <SelectItem value="recent">Mới nhất</SelectItem>
              <SelectItem value="oldest">Cũ nhất</SelectItem>
              <SelectItem value="highest">Đánh giá cao nhất</SelectItem>
              <SelectItem value="lowest">Đánh giá thấp nhất</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {children}
      <div className="flex items-center gap-2 p-4">
        <Button
          disabled={!comments.prevPage || comments.prevPage <= 0}
          onClick={getReviewPrevPage}
          className="w-8 h-8 flex items-center justify-center p-2 font-bold rounded-md border-blue-500 bg-blue-500"
        >
          <ChevronLeft />
        </Button>

        <Button
          variant={"outline"}
          onClick={getReviewNextPage}
          disabled={!comments.nextPage}
          className="w-8 h-8 flex items-center justify-center p-2 font-bold rounded-md border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default ListReview;
