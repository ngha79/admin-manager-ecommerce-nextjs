import React from "react";
import SliderEvent from "./_components/Slider";
import AddNewImageSlider from "./_components/AddNewImageSlider";
import ListImageSlider from "./_components/ListImageSlider";

const Page = () => {
  return (
    <div className="container py-4 space-y-4">
      <h1 className="text-lg font-medium py-2">Ảnh</h1>
      <AddNewImageSlider />
      <ListImageSlider />
    </div>
  );
};

export default Page;
