import React from 'react'
import { getListProduct } from '@/utils/actions/product'
import { BrandProduct } from '@/lib/interface'
import DataTableDemo from './data-table'

const Page = async ({
  searchParams,
}: {
  searchParams: {
    search: string
    sortBy: 'ctime' | 'price' | 'sales'
    page: number
    orderBy: 'ASC' | 'DESC'
    publish: boolean
    brand: BrandProduct
  }
}) => {
  const { search, sortBy, page, orderBy, publish, brand } = searchParams
  const response = await getListProduct({
    limit: 10,
    page: page,
    search,
    brand,
    order: orderBy,
    publish,
    searchBy: sortBy,
  })
  if (response.error) throw new Error()

  return (
    <div className="flex flex-col flex-1 p-4 md:p-8 overflow-x-auto">
      <DataTableDemo
        products={response?.data}
        nextPage={response?.nextPage}
        lastPage={response?.lastPage}
        prevPage={response?.prevPage}
      />
    </div>
  )
}

export default Page
