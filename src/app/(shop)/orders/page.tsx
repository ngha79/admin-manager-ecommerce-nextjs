import { getListOrders } from '@/utils/actions/orders'
import React from 'react'
import ListOrders from './_components/ListOrders'

const Page = async ({
  searchParams: { page, search, status },
}: {
  searchParams: { page: number; search: string; status: string }
}) => {
  const response = await getListOrders({
    page: 1,
    limit: 20,
    search: '',
    status: status !== 'all' ? status : '',
  })
  if (response.error) throw new Error(response.message)
  return (
    <div className="p-4 max-w-7xl mx-auto py-6 w-full flex flex-col gap-4">
      <h1 className="text-lg font-medium">Danh sách đơn hàng</h1>
      <ListOrders data={response} />
    </div>
  )
}

export default Page
