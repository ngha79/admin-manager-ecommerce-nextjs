import React from 'react'
import DataTableDemo from './data-table'
import { getListVoucherShop } from '@/utils/actions/vouchers'

const Page = async ({
  searchParams,
}: {
  searchParams: {
    search: string
    page: number
    isActive: boolean
  }
}) => {
  const { search, page, isActive } = searchParams
  const response = await getListVoucherShop({
    limit: 10,
    page: page,
    search,
    isActive,
  })
  return (
    <div className="container py-4 flex flex-col flex-1 overflow-x-auto">
      <h1 className="font-bold text-2xl">Danh sách mã giảm giá</h1>
      {!response.error ? (
        <DataTableDemo
          voucher={response?.data}
          nextPage={response?.nextPage}
          lastPage={response?.lastPage}
          prevPage={response?.prevPage}
          searchVoucher={search}
        />
      ) : null}
    </div>
  )
}

export default Page
