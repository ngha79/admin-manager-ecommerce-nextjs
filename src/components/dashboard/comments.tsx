import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getListRating } from "@/utils/actions/rating";
import Comment from "./comment/Comment";

const Comments = async () => {
  let comments = null;
  try {
    const response = await getListRating({
      limit: 20,
      page: 1,
      order: "recent",
    });
    comments = response.payload.data;
  } catch (error) {
    return comments;
  }

  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Bình luận gần đây
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/product/reviews">
              Xem tất cả
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardTitle>
      </CardHeader>
      {comments.length ? (
        <CardContent className="grid gap-8">
          {comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </CardContent>
      ) : (
        <CardContent>
          <CardDescription className="text-center">
            Không có bình luận nào gần đây
          </CardDescription>
        </CardContent>
      )}
    </Card>
  );
};

export default Comments;
