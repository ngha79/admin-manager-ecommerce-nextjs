import { getProductById } from '@/utils/actions/product'
import { notFound } from 'next/navigation'
import React from 'react'
import Product from './product'

const Page = async ({ params }: { params: { id: string } }) => {
  const response = await getProductById(params.id)
  if (response.error) {
    if (response.error === 404) throw notFound()
    throw new Error()
  }
  return <Product product={response} />
}

export default Page
