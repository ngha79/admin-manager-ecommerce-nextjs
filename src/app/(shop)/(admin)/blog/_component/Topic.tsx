"use client";

import React from "react";
import DeleteTopic from "./DeleteTopic";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UpdateTopic from "./UpdateTopic";

const Topic = ({ topic }: { topic: any }) => {
  return (
    <div className="group flex items-center text-sm gap-2 pr-4 bg-background shadow-md border rounded-md text-black">
      <Link
        href={`/blog/topic/${topic.topic}`}
        className={cn("w-max font-medium flex items-center gap-2 pl-4 py-2")}
      >
        <span>{topic.topic}</span>
        <span>{topic.blogCount}</span>
      </Link>
      <DeleteTopic id={topic.id} />
      <UpdateTopic topic={topic} />
    </div>
  );
};

export default Topic;
