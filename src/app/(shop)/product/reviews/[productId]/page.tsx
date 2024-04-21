import React from 'react'

const Page = ({ params }: { params: { productId: string } }) => {
  return <div>{params.productId}</div>
}

export default Page
