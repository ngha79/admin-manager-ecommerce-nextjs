import Image from 'next/image'
import React from 'react'

const Product = ({ product }: { product: any }) => {
  return (
    <div className="bg-background gap-2 shadow-md rounded-sm w-full flex items-center">
      <Image
        alt="thumb product"
        src={product?.picture?.[0]?.product_thumb}
        width={240}
        height={120}
      />
      <h1>{product?.name}</h1>
      <h1>{product?.brand}</h1>
      <h1>đ{product?.price}</h1>
      <h1>Đã bán: {product?.sold}</h1>
      <h1>{!!product?.isPublish ? 'Đang bán' : 'Chưa hoạt động'}</h1>
    </div>
  )
}

export default Product
