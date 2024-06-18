"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Trash, UserX } from "lucide-react";

export function OptionDefault() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "group-hover:block mr-8 hover:bg-gray-100 top-1/2 right-2 -translate-y-1/2 absolute border p-2 rounded-full bg-background"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-ellipsis"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-2" align="end">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Button
              variant={"ghost"}
              className="flex items-center justify-start gap-2  px-2 py-0"
            >
              <UserX className="w-4 h-4" />
              <span>Chặn khách hàng</span>
            </Button>
            <Button
              variant={"ghost"}
              className="flex items-center justify-start gap-2  px-2 py-0"
            >
              <Trash className="w-4 h-4" />
              <span>Xóa đoạn chat</span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
