import React from "react";
import { format } from "date-fns";

import StarComment from "./Star";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Comment = ({ comment }: { comment: any }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="hidden h-9 w-9 sm:flex">
          <AvatarImage src={comment.user.avatar || "/login.png"} alt="Avatar" />
          <AvatarFallback>{comment.user.userName[0]}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <p className="text-sm font-medium leading-none">
            {comment.user.userName}
          </p>
          <p className="text-sm text-muted-foreground">{comment.user.email}</p>
        </div>
      </div>
      <StarComment rating={comment.rating} />
      <div className="flex flex-col">
        <div className="max-w-32 truncate">{comment.content}</div>
        <span className="text-xs font-light">
          {format(comment.createdAt, "hh:mm dd/MM/yyyy")}
        </span>
      </div>
    </div>
  );
};

export default Comment;
