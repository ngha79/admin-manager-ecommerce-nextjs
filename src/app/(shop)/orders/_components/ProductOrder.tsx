import React from "react";
import Image from "next/image";

interface IOrderItem {
  quantity: number;
  product: any;
  productAttribute: any;
}

const ProductOrder = ({
  orderItem: { quantity, product, productAttribute },
}: {
  orderItem: IOrderItem;
}) => {
  return (
    <div className="flex gap-4 border p-2 justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 flex items-center justify-center">
          <Image
            alt="thumb product"
            src={productAttribute.thumb}
            width={64}
            height={64}
            className="w-20 h-20 border rounded-md"
          />
        </div>
        <div className="flex items-start flex-col gap-0.5">
          <div className="text-gray-700 max-w-40 md:max-w-64 font-medium line-clamp-1">
            {product?.name}
          </div>
          <div className="text-sm text-gray-700">Số lượng: x{quantity}</div>
          <div className="text-sm text-gray-700 font-medium">
            Danh mục: {product?.brand}
          </div>
          <div className="text-sm text-gray-700">
            Size: {productAttribute?.size}
          </div>
          <div className="text-sm text-gray-700">
            {productAttribute?.material}
          </div>
        </div>
      </div>
      <div className="flex flex-col font-medium sm:flex-row text-sm text-gray-500 gap-2">
        <span className="line-clamp-1">Giá sản phẩm: </span>
        <span className="text-destructive text-center">
          {product?.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
    </div>
  );
};

export default ProductOrder;
