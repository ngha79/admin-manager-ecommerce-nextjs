import React from 'react'
import FormUpdate from './FormUpdate'
import { getProfileShop } from '@/utils/actions/shop'

const Page = async ({ params }: { params: { id: string } }) => {
  const response = await getProfileShop(params.id)
  if (response.error) throw new Error(response.message)
  return <FormUpdate user={response} />
}

export default Page
