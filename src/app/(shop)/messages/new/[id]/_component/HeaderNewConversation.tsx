import React from "react";
import ButtonBack from "../../../[conversationId]/_components/ButtonBack";
import Image from "next/image";

interface INewConversation {
  user: {
    id: string;
    avatar?: string;
    background?: string;
    userName: string;
  };
}

const HeaderNewConversation = ({ user }: INewConversation) => {
  return (
    <div className="sticky top-0 w-full z-[2] items-center justify-between shadow-md bg-background px-4 py-3">
      <div className="flex items-center gap-2">
        <ButtonBack />
        <Image
          alt="avatar user"
          src={user?.avatar || "/login.png"}
          width={52}
          height={52}
          className="w-14 h-14 rounded-full border"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-[15px]">{user.userName}</h3>
        </div>
      </div>
    </div>
  );
};

export default HeaderNewConversation;
