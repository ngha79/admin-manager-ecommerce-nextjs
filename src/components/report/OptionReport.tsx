import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ban, Trash, X } from "lucide-react";

const OptionReport = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="border p-2 cursor-pointer rounded-full hover:bg-gray-300">
          <X size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
          <Trash size={16} />
          <span>Xóa</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
          <Ban size={16} />
          <span>Cấm người dùng</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionReport;
