"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import http from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import { reFetchTag } from "@/utils/server";
import { Delete, Plus } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const AddNewImageSlider = () => {
  const thumbProduct = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<Array<string>>([]);
  const [files, setFiles] = useState<any>([]);
  const [isLoading, startTransition] = useTransition();
  const onUploadThumb = () => {
    thumbProduct?.current?.click();
  };

  const handleUploadThumb = (e: { target: { files: any } }) => {
    if (e.target.files) {
      for (let index = 0; index < e.target.files.length; index++) {
        const element = e.target.files[index];
        const image = URL.createObjectURL(element);
        setImages((prev) => [...prev, image]);
      }
      setFiles([...e.target.files]);
    }
  };

  function deleteElement(array: any, index: number) {
    if (index < 0 || index >= array.length || array.length === 0) {
      return array;
    }
    return array.slice(0, index).concat(array.slice(index + 1));
  }

  const onDeleteImage = (index: number) => {
    setImages((prev) => [...deleteElement(prev, index)]);
    setFiles((prev: any) => [...deleteElement(prev, index)]);
  };

  const handleAddNewImage = async () => {
    if (!files.length) return null;
    startTransition(async () => {
      const formData = new FormData();
      for (let index = 0; index < files.length; index++) {
        const element = files[index];
        formData.append("sliders", element);
      }
      try {
        await http.post("/admin/slider", formData, { token: true });
        toast.success("Thêm ảnh mới thành công.", { position: "bottom-right" });
        await reFetchTag("sliders");
        setFiles([]);
        setImages([]);
      } catch (error) {
        toast.error(ResponseExceptions.DEFAULT_ERROR, {
          position: "bottom-right",
        });
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-medium">Thêm ảnh mới</h1>
      <Input
        type="file"
        ref={thumbProduct}
        multiple
        className="hidden"
        onChange={handleUploadThumb}
      />
      <div className="flex flex-wrap gap-2">
        <div
          className="relative lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 border rounded-md shadow-md"
          onClick={onUploadThumb}
        >
          <Plus className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        {images?.length
          ? images.map((image, index: number) => (
              <div
                key={index}
                className="relative lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 border rounded-md overflow-hidden"
              >
                <Image alt="thumb" src={image} fill />
                <div
                  onClick={() => onDeleteImage(index)}
                  className="absolute cursor-pointer top-0 left-0 hover:bg-gray-200/10 hover:text-background/80 text-transparent w-full h-full"
                >
                  <Delete
                    size={32}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
            ))
          : null}
      </div>
      <Button onClick={handleAddNewImage} disabled={isLoading || !files.length}>
        Thêm
      </Button>
    </div>
  );
};

export default AddNewImageSlider;
