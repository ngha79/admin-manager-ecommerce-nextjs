'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Product from './Product'
import Pagination from './pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export interface IListFeatureProduct {
  data: any[]
  lastPage: number | null
  nextPage: number | null
  prevPage: number | null
}

export function ListFeatureProduct({
  resultProduct,
}: {
  resultProduct: IListFeatureProduct
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const handleGetProductPublish = (type: boolean) => {
    const params = new URLSearchParams(searchParams)
    params.set('publish', `${type}`)
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleDeletePublishSearchParam = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('publish')
    router.replace(`${pathname}?${params.toString()}`)
  }
  return (
    <Tabs
      defaultValue="all"
      className="w-full space-y-4"
    >
      <TabsList className="grid w-full grid-cols-3 gap-4">
        <TabsTrigger
          value="all"
          onClick={handleDeletePublishSearchParam}
        >
          Tất cả
        </TabsTrigger>
        <TabsTrigger
          value="publish"
          onClick={() => handleGetProductPublish(true)}
        >
          Đang bán
        </TabsTrigger>
        <TabsTrigger
          value="unpublish"
          onClick={() => handleGetProductPublish(false)}
        >
          Không hoạt động
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div className="space-y-8">
          <div className="w-full flex flex-col transition-all duration-200 grid-cols-2 gap-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {resultProduct?.data?.map((item) => (
              <Product
                key={item.id}
                product={item}
              />
            ))}
          </div>
          {resultProduct?.data?.length ? (
            <Pagination totalPage={resultProduct?.lastPage} />
          ) : (
            <div className="min-h-[500px] font-medium flex items-center justify-center text-lg text-gray-600 w-full">
              Không có sản phẩm nào.
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="publish">
        <div className="space-y-8">
          <div className="w-full flex flex-col transition-all duration-200 grid-cols-2 gap-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {resultProduct?.data?.map((item) => (
              <Product
                key={item.id}
                product={item}
              />
            ))}
          </div>
          {resultProduct?.data?.length ? (
            <Pagination totalPage={resultProduct?.lastPage} />
          ) : (
            <div className="min-h-[500px] font-medium flex items-center justify-center text-lg text-gray-600 w-full">
              Không có sản phẩm nào.
            </div>
          )}
        </div>
      </TabsContent>
      <TabsContent value="unpublish">
        <div className="space-y-8">
          <div className="w-full flex flex-col transition-all duration-200 grid-cols-2 gap-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {resultProduct?.data?.map((item) => (
              <Product
                key={item.id}
                product={item}
              />
            ))}
          </div>
          {resultProduct?.data?.length ? (
            <Pagination totalPage={resultProduct?.lastPage} />
          ) : (
            <div className="min-h-[500px] font-medium flex items-center justify-center text-lg text-gray-600 w-full">
              Không có sản phẩm nào.
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}
