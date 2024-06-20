// @ts-nocheck
"use client";

import { z } from "zod";
import Image from "next/image";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Delete, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState, useTransition } from "react";

import FormAddProductAttribute from "./FormAddProductAttribute";
import { cn, ResponseExceptions } from "@/lib/utils";
import { createProduct } from "@/utils/actions/product";
import Loading from "@/components/Loading";
import http, { HttpError } from "@/lib/http";
import { reFetchTag } from "@/utils/server";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProductAttribute from "./ProductAttribute";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FroalaEditor = dynamic(
  () => {
    return Promise.all([
      import("react-froala-wysiwyg"),
      import("froala-editor/css/froala_editor.pkgd.min.css"),
      import("froala-editor/css/froala_style.min.css"),
      import("froala-editor/js/plugins/image.min.js"),
      import("froala-editor/js/plugins.pkgd.min.js"),
    ]).then(([module]) => module);
  },
  {
    ssr: false,
  }
);

const FroalaEditorView = dynamic(
  () => {
    return Promise.all([
      import("react-froala-wysiwyg/FroalaEditorView"),
      import("froala-editor/css/froala_editor.pkgd.min.css"),
      import("froala-editor/css/froala_style.min.css"),
      import("froala-editor/js/plugins/image.min.js"),
      import("froala-editor/js/plugins.pkgd.min.js"),
    ]).then(([module]) => module);
  },
  {
    ssr: false,
  }
);

interface IProduct {
  name: string;
  brand: string;
  price: number;
  picture: File[];
}

interface IProductAttribute {
  material: string;
  size: string;
  thumb: File;
  image: string;
  id: number;
}

const productValidator = z.object({
  name: z.string().min(1, { message: "Bạn chưa nhập tên sản phẩm." }),
  brand: z
    .string({ required_error: "Bạn chưa chọn danh mục của sản phẩm." })
    .min(1, { message: "Bạn chưa chọn danh mục của sản phẩm." }),
  price: z
    .number()
    .min(1000, { message: "Giá của sản phẩm từ 1000đ trở lên." }),
  picture: z.any(),
});

type TProductValidator = z.infer<typeof productValidator>;

const Page = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const thumbProduct = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>("");
  const [isLoading, startTransition] = useTransition();

  const [listProductAttribute, setListProductAttribute] = useState<
    IProductAttribute[]
  >([]);

  const onUploadThumb = () => {
    thumbProduct?.current?.click();
  };

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<TProductValidator>({
    resolver: zodResolver(productValidator),
  });

  const handleUploadThumb = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = URL.createObjectURL(e.target.files[0]);
      setImage(image);
      setValue("picture", e.target.files);
    }
  };

  const handleAddProductAttribute = (value: IProductAttribute) => {
    setListProductAttribute([
      ...listProductAttribute,
      { ...value, id: listProductAttribute.length },
    ]);
  };

  const deleteProductAttribute = (id: number) => {
    setListProductAttribute(
      listProductAttribute.filter((item) => item.id !== id)
    );
  };

  const onSubmit = async (data: TProductValidator) => {
    if (!data.picture) {
      return toast.error("Bạn chưa thêm ảnh cho sản phẩm.");
    }
    if (!listProductAttribute.length) {
      return toast.error("Bạn chưa thêm các phân loại của sản phẩm.");
    }
    const formData = new FormData();
    formData.append("brand", data.brand);
    formData.append("detail", description);
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    for (let i = 0; i < data.picture.length; i++) {
      formData.append("picture", data.picture[i]);
    }
    formData.append("attributes", JSON.stringify(listProductAttribute));
    for (let i = 0; i < listProductAttribute.length; i++) {
      formData.append("attribute", listProductAttribute[i].thumb);
    }
    startTransition(async () => {
      try {
        await createProduct(formData);
        await reFetchTag("products");
        toast.success("Tạo sản phẩm thành công.");
        router.replace("/product/list");
      } catch (error) {
        if (error instanceof HttpError) {
          toast.error(error.payload.message);
        } else {
          toast.error(ResponseExceptions.DEFAULT_ERROR);
        }
      }
    });
  };

  const handleSetBrand = (value: string) => {
    setValue("brand", value);
    trigger("brand");
  };

  return (
    <div className="w-full flex flex-col gap-4 p-4 min-h-screen">
      {isLoading ? <Loading /> : null}
      <form className="flex-1 p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-lg font-medium">Thêm sản phẩm mới</h1>
        {/* Product */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Tên sản phẩm</Label>
          <Input
            type="text"
            {...register("name")}
            className={cn({
              "focus-visible:ring-red-500": errors.name,
            })}
          />
          {errors?.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col sm:grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="brand">Danh mục</Label>
            <Select onValueChange={(value) => handleSetBrand(value)}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Danh mục"
                  color={"text-destructive"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Thời trang">Thời trang</SelectItem>
                  <SelectItem value="Giày dép">Giày dép</SelectItem>
                  <SelectItem value="Sách">Sách</SelectItem>
                  <SelectItem value="Thiết bị điện tử">
                    Thiết bị điện tử
                  </SelectItem>
                  <SelectItem value="Sắc đẹp">Sắc đẹp</SelectItem>
                  <SelectItem value="Sức khỏe">Sức khỏe</SelectItem>
                  <SelectItem value="Đồ chơi">Đồ chơi</SelectItem>
                  <SelectItem value="Chăm sóc thú cưng">
                    Chăm sóc thú cưng
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors?.brand && (
              <p className="text-sm text-red-500">{errors.brand.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Giá sản phẩm</Label>
            <Input
              type="number"
              {...register("price", {
                setValueAs: (value) => Number(value),
              })}
              className={cn({
                "focus-visible:ring-red-500": errors.price,
              })}
            />
            {errors?.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="picture">Ảnh</Label>
          <Input
            type="file"
            {...register("picture")}
            className="hidden"
            ref={thumbProduct}
            multiple
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
                <div className="absolute cursor-pointer top-0 left-0 hover:bg-gray-200/10 hover:text-background/80 text-transparent w-full h-full">
                  <Delete
                    size={32}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="font-medium">Thống tin sản phẩm</h1>
          <FroalaEditor
            tag="textarea"
            config={{
              imageUploadURL: "/api/upload",
              imageUploadParams: {
                key: "value",
              },
              imageUploadMethod: "POST",
              imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
              imageMaxSize: 10 * 1024 * 1024, // 10MB
              events: {
                "image.beforeUpload": function (images: FileList) {
                  const data = new FormData();
                  data.append("file", images[0]);
                  http
                    .post("/upload-file", data, {
                      token: true,
                    })
                    .then((res: any) => {
                      this?.image?.insert(
                        res.payload.secure_url,
                        null,
                        null,
                        this?.image?.get()
                      );
                    })
                    .catch((err) => {});
                  return false;
                },
              },
            }}
            onModelChange={setDescription}
          />
          <FroalaEditorView model={description} />
        </div>
      </form>
      {/* Product Attribute */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-lg font-medium">Phân loại sản phẩm</h1>
        {listProductAttribute?.map((item) => (
          <ProductAttribute
            key={item.id}
            productAttribute={item}
            deleteProductAttribute={deleteProductAttribute}
          />
        ))}
        <FormAddProductAttribute
          handleAddProductAttribute={handleAddProductAttribute}
        />
      </div>
      <div className="flex items-center justify-end gap-8">
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Tạo sản phẩm
        </Button>
        <Button
          type="button"
          variant={"destructive"}
          onClick={() => router.replace("/product/list")}
        >
          Hủy
        </Button>
      </div>
    </div>
  );
};

export default Page;
