"use client";

import { useState } from "react";
import { Trash, UserX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function OptionConversation() {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setOpen(!isOpen);
  };

  return (
    <Popover open={isOpen} onOpenChange={(value) => setOpen(value)}>
      <PopoverTrigger asChild>
        <button
          onClick={handleOpen}
          className={cn(
            "group-hover:block hover:bg-gray-100 top-1/2 right-2 z-[4] -translate-y-1/2 absolute border p-2 rounded-full bg-background",
            isOpen ? "" : "hidden"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
      <PopoverContent className="w-52 p-2">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Button
              variant={"ghost"}
              className="flex items-center justify-start px-3 py-0 gap-2"
            >
              <UserX className="w-4 h-4" />
              <span>Chặn khách hàng</span>
            </Button>
            <Button
              variant={"ghost"}
              className="flex items-center justify-start px-3 py-0 gap-2"
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
