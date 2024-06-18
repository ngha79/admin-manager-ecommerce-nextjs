import React from "react";
import { Star } from "lucide-react";

const StarComment = ({ rating }: { rating: number }) => {
  return (
    <div className="items-center flex font-medium text-gray-700">
      {Array.from({ length: rating }).map((item, index) => (
        <Star key={index} size={16} fill="#fcd34d" className="text-amber-300" />
      ))}
      {Array.from({ length: 5 - rating }).map((item, index) => (
        <Star key={index} size={16} className="text-amber-300" />
      ))}
    </div>
  );
};

export default StarComment;
