'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Orders from './Orders'

const ListOrders = ({ data }: { data: any }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const handleSetTypePurchase = (typeOrder: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('status', typeOrder)
    router.push(`${pathname}?${params.toString()}`)
  }
  return (
    <div className="flex flex-col gap-4">
      <Tabs
        defaultValue="all"
        className="space-y-4"
      >
        <TabsList className="w-full flex justify-between overflow-x-auto shadow-login rounded-md">
          <TabsTrigger
            className="w-full"
            value="all"
            onClick={() => handleSetTypePurchase('all')}
          >
            Tất cả
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="shipping"
            onClick={() => handleSetTypePurchase('shipping')}
          >
            Vận chuyển
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="pending"
            onClick={() => handleSetTypePurchase('pending')}
          >
            Chờ giao hàng
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="confirmed"
            onClick={() => handleSetTypePurchase('confirmed')}
          >
            Xác nhận
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="cancelled"
            onClick={() => handleSetTypePurchase('cancelled')}
          >
            Đã hủy
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="delivered"
            onClick={() => handleSetTypePurchase('delivered')}
          >
            Hoàn thành
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Orders listOrders={data} />
        </TabsContent>
        <TabsContent value="shipping">
          <Orders listOrders={data} />
        </TabsContent>
        <TabsContent value="pending">
          <Orders listOrders={data} />
        </TabsContent>
        <TabsContent value="confirmed">
          <Orders listOrders={data} />
        </TabsContent>
        <TabsContent value="cancelled">
          <Orders listOrders={data} />
        </TabsContent>
        <TabsContent value="delivered">
          <Orders listOrders={data} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ListOrders
