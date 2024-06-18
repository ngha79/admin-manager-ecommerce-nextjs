import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Clock, Sliders, Star } from "lucide-react";

import { ReviewDetail } from "./ReviewDetail";
import { IListComment } from "./ListReview";

const Review = ({ review }: { review: IListComment }) => {
  return (
    <div className="p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Image
          alt="avatar user review"
          src={review.user.avatar ? review.user.avatar : "/login.png"}
          width={60}
          height={60}
          className="border h-16 w-16 rounded-full"
        />
        <div className="flex flex-col">
          <h1 className="font-bold md:text-lg">{review.user.userName}</h1>

          <a
            href={`mailto:${review.user.email}`}
            className="relative inline-block"
          >
            <span className="font-medium text-sm relative md:text-base text-blue-600 after:absolute after:w-0 after:h-[1px] after:block after:left-0 after:bg-blue-500 hover:after:w-full hover:after:left-0 hover:after:bg-blue-500 after:transition-width after:duration-200 after:ease-in">
              {review.user.email}
            </span>
          </a>
        </div>
      </div>
      <div className="md:flex items-center gap-2 hidden font-bold text-gray-700">
        {Array.from({ length: review.rating }).map((item, index) => (
          <Star
            key={index}
            size={18}
            fill="#fcd34d"
            className="text-amber-300"
          />
        ))}
        {Array.from({ length: 5 - review.rating }).map((item, index) => (
          <Star key={index} size={18} className="text-amber-300" />
        ))}
        <span>{review.rating}</span>
      </div>
      <div className="gap-4 hidden xl:flex border p-4 rounded-md max-w-md">
        <div className="line-clamp-2">{review.content}</div>
        <ReviewDetail review={review} />
      </div>
      <div className="md:flex gap-1 hidden items-center">
        <Clock fill="#2563eb" className="text-white" size={18} />
        <div className="grid">
          <span className="font-bold">
            {format(review.createdAt, "dd/MM/yyyy")}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {format(review.createdAt, "HH:mm")}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ReviewDetail review={review} />
        <Sliders className="text-blue-500" />
      </div>
    </div>
  );
};

export default Review;
