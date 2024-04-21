import Image from 'next/image'
import React from 'react'

interface IOrderItem {
  quantity: number
  product: any
  productAttribute: any
}

const ProductOrder = ({
  orderItem: { quantity, product, productAttribute },
}: {
  orderItem: IOrderItem
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
            className="max-w-20 max-h-20 border"
          />
        </div>
        <div className="flex items-start flex-col gap-1">
          <div className="text-gray-700 max-w-40 md:max-w-64 line-clamp-1">
            {product?.name}
          </div>
          <div className="text-xs text-gray-700">Số lượng: x{quantity}</div>
          <div className="text-xs text-gray-700">
            Dang mục: {product?.brand}
          </div>
          <div className="text-xs text-gray-700">
            Size: {productAttribute?.size}
          </div>
          <div className="text-xs text-gray-700">
            {productAttribute?.material}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row text-sm text-gray-500 gap-2">
        <span className="line-clamp-1">Giá sản phẩm: </span>
        <span className="text-destructive text-center">
          {product?.price?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'VND',
          })}
        </span>
      </div>
    </div>
  )
}

export default ProductOrder
