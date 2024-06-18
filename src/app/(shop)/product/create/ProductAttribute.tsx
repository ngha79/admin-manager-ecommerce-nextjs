import { Trash } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface IProductAttribute {
  material: string;
  size: string;
  thumb: File;
  image: string;
  id: number;
}

const ProductAttribute = ({
  productAttribute,
  deleteProductAttribute,
}: {
  productAttribute: IProductAttribute;
  deleteProductAttribute: (id: number) => void;
}) => {
  const handleDelete = () => {
    deleteProductAttribute(productAttribute.id);
  };
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="size">Kích cỡ</Label>
          <Input
            type="text"
            name="size"
            id="size"
            value={productAttribute.size}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="material">Màu sắc, chất liệu...</Label>
          <Input
            type="text"
            name="material"
            disabled
            value={productAttribute.material}
            id="material"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="thumb">Ảnh</Label>
        <div className="flex flex-wrap gap-2">
          <div className="relative lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 border rounded-md overflow-hidden">
            <Image alt="thumb" src={productAttribute.image} fill />
          </div>
        </div>
      </div>
      <Button
        className="flex items-center gap-2 w-max"
        variant={"destructive"}
        onClick={handleDelete}
      >
        <Trash size={18} />
        Xóa
      </Button>
    </>
  );
};

export default ProductAttribute;
