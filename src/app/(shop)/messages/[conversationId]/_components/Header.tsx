import Image from "next/image";
import React from "react";
import ButtonBack from "./ButtonBack";
import { OptionDefault } from "./OptionDefault";
import { IConversation } from "@/types/conversations";

const Header = ({ conversation }: { conversation: IConversation }) => {
  return (
    <div className="w-full items-center justify-between shadow-md relative bg-background px-4 py-3 border-b">
      <div className="flex items-center gap-2">
        <ButtonBack />
        <Image
          alt="avatar user"
          src={conversation?.user.avatar || "/login.png"}
          width={52}
          height={52}
          className="w-14 h-14 rounded-full border"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-[15px]">
            {conversation?.user.userName}
          </h3>
          <span className="text-gray-700 text-xs">Đang hoạt động</span>
        </div>
      </div>
      <OptionDefault />
    </div>
  );
};

export default Header;
