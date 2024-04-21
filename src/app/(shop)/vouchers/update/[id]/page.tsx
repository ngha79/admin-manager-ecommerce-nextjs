export const revalidate = 0
export const dynamic = 'force-dynamic'

import { getVoucher, updateVoucher } from '@/utils/actions/vouchers'
import React from 'react'
import FormUpdate from './FormUpdate'

const Page = async ({ params }: { params: { id: string } }) => {
  const voucher = await getVoucher(params.id)

  return (
    <div className="container py-4 space-y-4">
      <h1 className="font-bold text-2xl">Cập nhật mã giảm giá</h1>
      <FormUpdate
        id={params.id}
        voucher={voucher}
      />
    </div>
  )
}

export default Page
