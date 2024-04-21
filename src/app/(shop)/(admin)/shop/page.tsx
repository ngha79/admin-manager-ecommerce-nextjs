import React from 'react'
import DataShops from './data-table-shops'
import { getListShops } from '@/utils/actions/shop'

const Page = async ({
  searchParams: { page, limit, search, order, isActive },
}: {
  searchParams: {
    page: number
    limit: number
    search: string
    order: string
    isActive: string
  }
}) => {
  const response = await getListShops({
    page: page || 1,
    limit: limit || 20,
    search: search || '',
    order,
    isActive,
  })
  if (response.error) throw new Error(response.message)
  const { data, lastPage, nextPage, prevPage } = response
  return (
    <div className="max-w-7xl mx-auto w-full p-4 flex flex-col gap-4">
      <h1 className="font-bold text-lg">Quản lý Shop bán hàng</h1>
      <DataShops
        order={order}
        searchShop={search}
        shops={data}
        lastPage={lastPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  )
}

export default Page
