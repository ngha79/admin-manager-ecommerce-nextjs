import React from "react";
import ReviewRateItem from "./ReviewRateItem";

const ReviewRate = ({
  rating,
  totalRating,
}: {
  rating: [
    {
      rating: number;
      count: number;
    }
  ];
  totalRating: number;
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 flex-1 col-span-4 lg:col-span-2 bg-background rounded-md shadow-md">
      {rating.map((item, index) => (
        <ReviewRateItem
          star={item.rating}
          value={Number((item.count / totalRating).toFixed(3)) * 100 || 0}
          key={index}
        />
      ))}
    </div>
  );
};

export default ReviewRate;
