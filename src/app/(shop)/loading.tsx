import Loader from "@/components/Loader";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen-layout w-full flex items-center justify-center relative">
      <Loader />
    </div>
  );
};

export default Loading;
