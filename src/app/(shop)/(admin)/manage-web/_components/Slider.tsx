"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function SliderEvent({ images }: any) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <Carousel
      className="w-full"
      plugins={[plugin.current]}
      opts={{
        align: "start",
        loop: true,
        direction: "ltr",
      }}
    >
      <CarouselContent>
        {Array.from(images).map((_: any, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Image
                alt="image"
                src={_.url}
                width={3000}
                height={320}
                className="max-h-[400px] object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}
