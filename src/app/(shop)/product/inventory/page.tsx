import { getInventories } from '@/utils/actions/inventory'
import React from 'react'
import ListInventory from './ListInventory'

const Page = async ({
  searchParams,
}: {
  searchParams: { page: number; limit: number }
}) => {
  const response = await getInventories({ page: 1, limit: 20 })
  if (response.error) throw new Error()
  return (
    <div className="py-4 md:p-8 flex-1 flex flex-col gap-4 md:gap-8">
      <h1 className="md:text-2xl text-lg px-4 font-medium">
        Kho hàng sản phẩm
      </h1>
      <ListInventory listInventory={response} />
    </div>
  )
}

export default Page
