// @ts-nocheck
"use client";

import { z } from "zod";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Delete, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import http, { HttpError } from "@/lib/http";
import { cn, ResponseExceptions } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "@/components/Loading";
import ProductAttribute from "./ProductAttribute";
import FormAddProductAttribute from "./FormAddProductAttribute";
import { updateProduct } from "@/utils/actions/product";
import ProductAttributeNew from "./ProductAttributeNew";
import {
  IProduct,
  IProductAttribute,
  IProductImage,
} from "@/utils/types/product";

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

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
};

const productValidator = z.object({
  name: z.string().min(1, { message: "Bạn chưa nhập tên sản phẩm." }),
  detail: z
    .string({ required_error: "Bạn chưa thêm mô tả cho sản phẩm." })
    .min(1, { message: "Bạn chưa thêm mô tả cho sản phẩm." }),
  brand: z
    .string({ required_error: "Bạn chưa chọn danh mục của sản phẩm." })
    .min(1, { message: "Bạn chưa chọn danh mục của sản phẩm." }),
  price: z
    .number()
    .min(1000, { message: "Giá của sản phẩm từ 1000đ trở lên." }),
  picture: z.any(),
});

type TProductValidator = z.infer<typeof productValidator>;

const Product = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [imagesDelete, setImagesDelete] = useState<number[]>([]);
  const [attributesDelete, setAttributesDelete] = useState<number[]>([]);
  const [productUpdate, setProductUpdate] = useState<IProduct>({
    attributes: [],
    brand: "",
    detail: "",
    isPublish: true,
    name: "",
    picture: [],
    price: 0,
    sold: 0,
    id: "",
  });
  const [description, setDescription] = useState<string>(product.detail);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [listProductAttributeUpdate, setListProductAttributeUpdate] = useState<
    IProductAttribute[]
  >([]);
  const [listProductAttributeNew, setListProductAttributeNew] = useState<
    IProductAttribute[]
  >([]);

  let thumbProduct = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (product) {
      setProductUpdate(product);
      setValue("brand", product.brand);
      setValue("detail", product.detail);
    }
  }, [product]);

  const handleUploadThumb = (e: any) => {
    if (!e.target.files?.length) return;
    Array.from(e.target.files).forEach((file: any) => {
      const image = URL.createObjectURL(file);
      setImages((images) => [...images, image]);
    });
    setFiles((files) => [...files, ...e.target.files]);
  };

  const handleAddProductAttribute = (value: IProductAttribute) => {
    setListProductAttributeNew([
      ...listProductAttributeNew,
      { ...value, id: listProductAttributeNew.length },
    ]);
  };

  const deleteProductAttribute = (id: number) => {
    const listAttributes = productUpdate?.attributes.filter(
      (item) => item.id !== id
    );
    setProductUpdate((prev: IProduct) => ({
      ...prev,
      attributes: listAttributes,
    }));
    setAttributesDelete([...attributesDelete, id]);
  };

  const deleteProductAttributeNew = (id: number) => {
    const listAttributes = listProductAttributeNew?.filter(
      (item) => item.id !== id
    );
    setListProductAttributeNew(listAttributes);
  };

  const updateProductAttribute = (data: IProductAttribute) => {
    const checkItem = productUpdate.attributes.find(
      (item) => item.id === data.id
    );
    if (JSON.stringify(checkItem) === JSON.stringify(data)) return;
    const newList = listProductAttributeUpdate.map((item) => {
      if (item.id === data.id) {
        return data;
      }
      return item;
    });
    setListProductAttributeUpdate(newList);
  };

  const updateProductAttributeNew = (data: IProductAttribute) => {
    const newList = listProductAttributeNew.map((item) => {
      if (item.id === data.id) {
        return data;
      }
      return item;
    });
    setListProductAttributeNew(newList);
  };

  const onSubmit = async (productData: TProductValidator) => {
    const hasAttributes =
      productUpdate.attributes.length || listProductAttributeNew.length;
    if (!hasAttributes) {
      return toast.error("Vui lòng thêm các phân loại của sản phẩm.");
    }

    const formData = new FormData();
    formData.append("brand", productData.brand);
    formData.append("detail", description);
    formData.append("name", productData.name);
    formData.append("price", productData.price.toString());

    for (let i = 0; i < files.length; i++) {
      formData.append("pictureNew", files[i]);
    }
    formData.append("pictureDelete", JSON.stringify(imagesDelete));

    const updatedAttributes = productUpdate.attributes.filter(
      (attribute) =>
        !listProductAttributeUpdate.some(
          (updatedAttribute) => updatedAttribute.id === attribute.id
        )
    );
    formData.append("attributes", JSON.stringify(updatedAttributes));
    formData.append(
      "attributesDelete",
      JSON.stringify(productUpdate.attributes)
    );
    formData.append("attributesNew", JSON.stringify(listProductAttributeNew));

    for (let i = 0; i < listProductAttributeNew.length; i++) {
      formData.append("attribute", listProductAttributeNew[i].file);
    }
    formData.append(
      "attributesUpdate",
      JSON.stringify(listProductAttributeUpdate)
    );

    for (let i = 0; i < listProductAttributeUpdate.length; i++) {
      formData.append("attributeUpdate", listProductAttributeUpdate[i].file);
    }

    setLoading(true);
    try {
      await updateProduct(product.id, formData);
      router.replace("/product/list");
      toast.success("Cập nhật sản phẩm thành công.");
    } catch (error) {
      if (error instanceof HttpError) {
        return toast.error(error.payload.message);
      }
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleSetBrand = (value: string) => {
    setValue("brand", value);
    trigger("brand");
  };

  const handleDeleteImageNew = (index: number, item: string) => {
    const newFileList = files;
    newFileList.splice(index, 1);
    setImages(images.filter((image) => image !== item));
    setFiles((files) => [...newFileList]);
  };

  const handleDeleteImage = (image: IProductImage) => {
    const listPicture = productUpdate?.picture.filter(
      (item) => item.id !== image.id
    );
    setProductUpdate((prev) => ({ ...prev, picture: listPicture }));
    setImagesDelete((prev) => [...prev, image.id]);
  };

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {isLoading ? <Loading /> : null}
      <form className="flex-1 p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-lg font-medium">Thêm sản phẩm mới</h1>
        {/* Product */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Tên sản phẩm</Label>
          <Input
            type="text"
            {...register("name")}
            defaultValue={product.name}
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
            <Select
              onValueChange={(value) => handleSetBrand(value)}
              defaultValue={product.brand}
            >
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
              defaultValue={product.price}
              className={cn({
                "focus-visible:ring-red-500": errors.price,
              })}
            />
            {errors?.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="isPublish">Trạng thái</Label>
            <Select
              onValueChange={(value) => handleSetBrand(value)}
              defaultValue={product.isPublish ? "publish" : "unpublish"}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Trạng thái"
                  color={"text-destructive"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="publish">Active</SelectItem>
                  <SelectItem value="unpublish">UnActive</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="sold">Sản phẩm đã bán</Label>
            <Input type="number" disabled defaultValue={product.sold} />
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
            onClick={(e: any) => (e.target.value = null)}
          />
          <div className="flex flex-wrap gap-2">
            <div
              className="lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 rounded-md shadow-lg relative"
              onClick={onUploadThumb}
            >
              <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            {productUpdate.picture?.map((item: IProductImage) => (
              <div
                key={item.id}
                className="relative lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 border rounded-md overflow-hidden"
              >
                <Image alt="thumb" src={item.product_thumb} fill />
                <div
                  onClick={() => handleDeleteImage(item)}
                  className="absolute cursor-pointer top-0 left-0 hover:bg-gray-200/10 hover:text-background/80 text-transparent w-full h-full"
                >
                  <Delete
                    size={32}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
            ))}
            {images?.map((item: string, index: number) => (
              <div
                key={index}
                className="relative lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 border rounded-md overflow-hidden"
              >
                <Image alt="thumb" src={item} fill />
                <div
                  onClick={() => handleDeleteImageNew(index, item)}
                  className="absolute cursor-pointer top-0 left-0 hover:bg-gray-200/10 hover:text-background/80 text-transparent w-full h-full"
                >
                  <Delete
                    size={32}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-medium">Thống tin sản phẩm</h1>
          <FroalaEditor
            tag="textarea"
            model={description}
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
        {productUpdate.attributes?.map((item) => (
          <ProductAttribute
            key={item.id}
            productAttribute={item}
            deleteProductAttribute={deleteProductAttribute}
            updateProductAttribute={updateProductAttribute}
          />
        ))}
        {listProductAttributeNew?.map((item) => (
          <ProductAttributeNew
            key={item.id}
            productAttribute={item}
            deleteProductAttributeNew={deleteProductAttributeNew}
            updateProductAttributeNew={updateProductAttributeNew}
          />
        ))}
        <FormAddProductAttribute
          handleAddProductAttribute={handleAddProductAttribute}
          listProductAttribute={productUpdate.attributes}
          listProductAttributeNew={listProductAttributeNew}
        />
      </div>
      <Button
        type="submit"
        // disabled={Object.keys(errors).length ? true : false}
        onClick={handleSubmit(onSubmit)}
      >
        Cập nhật sản phẩm
      </Button>
    </div>
  );
};

export default Product;
