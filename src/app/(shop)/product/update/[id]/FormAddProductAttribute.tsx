import { z } from "zod";
import Image from "next/image";
import { toast } from "sonner";
import { Delete, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";

interface IProductAttribute {
  material: string;
  size: string;
  thumb: string;
  file: File;
  id: number;
}

const productAttributeValidator = z.object({
  material: z.string().min(1, { message: "Bạn chưa nhập tên sản phẩm." }),
  size: z.string().min(1, { message: "Bạn chưa chọn danh mục của sản phẩm." }),
});

type TProductAttributeValidator = z.infer<typeof productAttributeValidator>;

const FormAddProductAttribute = ({
  handleAddProductAttribute,
  listProductAttribute,
  listProductAttributeNew,
}: {
  handleAddProductAttribute: (value: IProductAttribute) => void;
  listProductAttribute: IProductAttribute[];
  listProductAttributeNew: IProductAttribute[];
}) => {
  const [image, setImage] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [errorThumb, setErrorThumb] = useState<string>("");

  const thumbProduct = useRef<HTMLInputElement>(null);
  const onUploadThumb = () => {
    thumbProduct?.current?.click();
  };

  const handleUploadThumb = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = URL.createObjectURL(e.target.files[0]);
      setImage(image);
      setFile(e.target.files[0]);
      setErrorThumb("");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TProductAttributeValidator>({
    resolver: zodResolver(productAttributeValidator),
  });

  const onSubmit = async ({ material, size }: TProductAttributeValidator) => {
    if (!image || !file) return setErrorThumb("Bạn chưa thêm ảnh.");
    let item = listProductAttribute.find(
      (item) => item.material === material && item.size === size
    );
    if (item) {
      return toast.error("Dữ liệu trùng khớp!");
    }
    item = listProductAttributeNew.find(
      (item) => item.material === material && item.size === size
    );
    if (item) {
      return toast.error("Dữ liệu trùng khớp!");
    }
    handleAddProductAttribute({
      material,
      size,
      thumb: image,
      file: file,
      id: 0,
    });
    reset({ material: "", size: "" });
    setFile(null);
    setImage("");
  };

  const onDelete = () => {
    setFile(null);
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col sm:grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="size">Kích cỡ</Label>
          <Input
            {...register("size")}
            className={cn({
              "focus-visible:ring-red-500": errors.size,
            })}
          />
          {errors?.size && (
            <p className="text-sm text-red-500">{errors.size.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="material">Màu sắc, chất liệu...</Label>
          <Input
            {...register("material")}
            className={cn({
              "focus-visible:ring-red-500": errors.material,
            })}
          />
          {errors?.material && (
            <p className="text-sm text-red-500">{errors.material.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="thumb">Ảnh</Label>
        <Input
          type="file"
          className="hidden"
          ref={thumbProduct}
          onChange={handleUploadThumb}
        />
        <div className="flex flex-wrap gap-2">
          <div
            className="lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 rounded-md shadow-lg relative"
            onClick={onUploadThumb}
          >
            <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          {image ? (
            <div className="relative lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 border rounded-md overflow-hidden">
              <Image alt="thumb" src={image} fill />
              <div
                onClick={onDelete}
                className="absolute cursor-pointer top-0 left-0 hover:bg-gray-200/10 hover:text-background/80 text-transparent w-full h-full"
              >
                <Delete
                  size={32}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          ) : null}
        </div>
        {errorThumb && <p className="text-sm text-red-500">{errorThumb}</p>}
      </div>
      <div className="flex justify-end">
        <Button className="w-max">Thêm</Button>
      </div>
    </form>
  );
};

export default FormAddProductAttribute;
