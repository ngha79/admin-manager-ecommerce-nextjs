import React from "react";
import ImageSlider from "./ImageSlider";
import http from "@/lib/http";
import SliderEvent from "./Slider";

const ListImageSlider = async () => {
  let imageSliders = null;
  try {
    const response = await http.get<any>("admin/slider", {
      next: { tags: ["sliders"], revalidate: 3600 },
    });
    imageSliders = response.payload;
  } catch (error) {
    throw new Error();
  }
  if (!imageSliders) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-medium text-lg">Kết quả hiển thị</h1>
      <SliderEvent images={imageSliders} />
      <h1 className="font-medium text-lg">Danh sách</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
        {imageSliders?.map((image: any) => (
          <ImageSlider image={image} key={image.id} />
        ))}
      </div>
    </div>
  );
};

export default ListImageSlider;
