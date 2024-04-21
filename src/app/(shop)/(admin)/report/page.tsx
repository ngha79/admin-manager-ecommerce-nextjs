import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

const Page = () => {
  return (
    <div className="container py-4 space-y-4">
      <h1 className="font-bold text-2xl">Danh sách báo cáo</h1>
      <Tabs
        defaultValue="shop"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="shop">Cửa hàng</TabsTrigger>
          <TabsTrigger value="product">Sản phẩm</TabsTrigger>
          <TabsTrigger value="comment">Bình luận</TabsTrigger>
        </TabsList>
        <TabsContent value="shop">shop</TabsContent>
        <TabsContent value="product">password</TabsContent>
        <TabsContent value="comment">password</TabsContent>
      </Tabs>
    </div>
  )
}

export default Page
