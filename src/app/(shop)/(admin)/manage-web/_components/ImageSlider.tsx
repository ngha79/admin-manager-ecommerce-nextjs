import Image from "next/image";
import React from "react";
import DeleteImageSliderButton from "./DeleteImageSliderButton";

const ImageSlider = ({ image }: { image: any }) => {
  return (
    <div className="relative bg-background group border shadow-md rounded-md flex items-center justify-center">
      <Image
        alt="avatar"
        src={image.url}
        width={240}
        height={180}
        className="object-center"
      />
      <DeleteImageSliderButton image={image} />
    </div>
  );
};

export default ImageSlider;
