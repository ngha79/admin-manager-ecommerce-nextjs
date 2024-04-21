import React, { useEffect, useState } from 'react'
import Order from './Order'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import LoadMore from './LoadMore'
import Image from 'next/image'
import { getListOrders } from '@/utils/actions/orders'

const Orders = ({ listOrders }: { listOrders: any }) => {
  const [orders, setOrders] = useState<any[]>([])
  const [lastPage, setLastPage] = useState<number | null>(null)
  const [nextPage, setNextPage] = useState<number | null>(null)
  const searchParams = useSearchParams()
  const type = searchParams.get('status') || 'all'

  useEffect(() => {
    if (listOrders.data) {
      setOrders(listOrders.data)
      setNextPage(listOrders.nextPage)
      setLastPage(listOrders.lastPage)
    }
  }, [listOrders])

  const handleFetchOrders = async (isVisible: boolean) => {
    if (isVisible) {
      if (nextPage && nextPage !== lastPage) {
        const res = await getListOrders({
          limit: 20,
          page: nextPage,
          search: '',
          status: type === 'all' ? '' : type,
        })
        if (res.error) {
          return toast.error(res.message)
        }
        setOrders([...orders, ...res.data])
        setLastPage(res.lastPage)
        setNextPage(res.nextPage)
      }
    }
  }

  return (
    <>
      {orders.length ? (
        <div className="flex flex-col gap-4">
          {orders?.map((order: any) => (
            <Order
              key={order?.id}
              order={order}
            />
          ))}
        </div>
      ) : (
        <div className="h-[700px] flex flex-col gap-4 items-center justify-center text-sm text-gray-700">
          <Image
            alt="logo"
            src={'/order-image.png'}
            width={80}
            height={80}
          />
          <span>Chưa có đơn hàng</span>
        </div>
      )}
      {nextPage ? <LoadMore handleFetchOrders={handleFetchOrders} /> : null}
    </>
  )
}

export default Orders
