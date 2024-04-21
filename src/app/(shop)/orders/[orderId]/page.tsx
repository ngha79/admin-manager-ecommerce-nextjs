import { Button } from '@/components/ui/button'
import { getOrderById } from '@/utils/actions/orders'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import OrderAction from '../_components/OrderAction'

const StatusOrder: any = {
  pending: (
    <div className="flex items-center text-sm text-amber-500 gap-2 line-clamp-2">
      <span className="line-clamp-1">Đơn hàng đang chờ xác nhận</span>
    </div>
  ),
  cancel: (
    <div className="flex items-center text-sm text-red-500 gap-2 line-clamp-1">
      <span className="line-clamp-1"> Đơn hàng đã được hủy</span>
    </div>
  ),
  confirmed: (
    <div className="flex items-center text-sm text-green-500 gap-2 line-clamp-1">
      <span className="line-clamp-1"> Đơn hàng đã được xác nhận</span>
    </div>
  ),
  delivered: (
    <div className="flex items-center text-sm text-green-500 gap-2 line-clamp-1">
      <span className="line-clamp-1"> Đơn hàng đã giao hàng thành công</span>
    </div>
  ),
  shipping: (
    <div className="flex items-center text-sm text-blue-500 gap-2 line-clamp-1">
      <span className="line-clamp-1"> Đơn hàng đang trên đường giao</span>
    </div>
  ),
}

const Page = async ({ params }: { params: { orderId: string } }) => {
  const response = await getOrderById({ id: params.orderId })
  if (response.error) throw new Error(response.message)
  const { address } = response
  return (
    <div className="max-w-7xl w-full mx-auto p-4 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-background p-4 rounded-md shadow-sm">
        <div className="flex items-center gap-2 font-bold line-clamp-1">
          <p className="min-w-max">Mã đơn hàng:</p>
          <span className="min-w-52 line-clamp-1">
            {response.tracking_number}
          </span>
        </div>
        <div className="flex">{StatusOrder[response?.status]}</div>
      </div>
      <div className="flex flex-col gap-y-2 bg-background rounded-md px-4 md:px-8 py-4 shadow-login overflow-hidden">
        <h3 className="flex items-center gap-2 text-red-700 font-medium leading-5">
          <MapPin size={16} />
          <span className="line-clamp-1">Địa Chỉ Nhận Hàng</span>
        </h3>
        <div className="flex flex-wrap items-start md:items-center text-sm gap-1">
          <h3 className="font-semibold leading-5 w-max line-clamp-1 flex items-center gap-2">
            <span>{response.address?.userName}</span>
            <span>{response.address?.phoneNumber}</span>
          </h3>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="line-clamp-2">{address?.address}</span>
          </div>
        </div>
      </div>
      <div className="bg-background rounded-md shadow-login flex flex-col">
        <h3 className="p-4">Thanh toán</h3>
        <div className="flex flex-col bg-background rounded-md shadow-login">
          <div className="grid grid-cols-7 text-gray-500 p-4">
            <span className="col-span-3 text-start font-medium text-foreground">
              Sản phẩm
            </span>
            <span className="col-span-1 text-center text-sm line-clamp-1">
              Đơn Giá
            </span>
            <span className="col-span-1 text-center text-sm line-clamp-1">
              Số Lượng
            </span>
            <span className="col-span-2 text-end text-sm line-clamp-1">
              Thành tiền
            </span>
          </div>
          <div>
            {response.order.map((orderItem: any) => (
              <div
                className="grid grid-cols-7 py-4 px-6 justify-center items-center hover:bg-gray-100"
                key={orderItem.id}
              >
                <div className="flex items-center gap-2 col-span-3">
                  <Image
                    alt="logo-product"
                    src={orderItem?.productAttribute?.thumb}
                    width={60}
                    height={60}
                    className="border"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm line-clamp-2">
                      {orderItem?.product?.name}
                    </span>
                    <span className="text-xs line-clamp-1">
                      {orderItem?.productAttribute?.material}
                    </span>
                    <span className="text-xs line-clamp-1">
                      {orderItem?.productAttribute?.size}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-center">
                  {orderItem?.product?.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </div>
                <div className="text-xs text-center">{orderItem?.quantity}</div>
                <div className="text-sm col-span-2 gap-x-2 flex items-center justify-end">
                  <span className="text-xs text-gray-500">
                    {Number(
                      orderItem?.product?.price * orderItem?.quantity
                    )?.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end text-xs border-y border-gray-300 p-4">
          <div className="flex items-center w-1/2 justify-end">
            <span className="w-28">Tổng tiền hàng</span>
            <span className="w-32 text-end">
              {response.total_price?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          </div>

          <div className="flex items-center w-1/2 justify-end">
            <span className="w-28">Voucher giảm giá</span>
            <span className="w-32 text-end">
              {Number(
                response.total_price - response.total_price_apply_discount
              )?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          </div>
          <div className="flex items-center w-1/2 justify-end">
            <span className="w-28">Tổng thanh toán</span>
            <span className="w-32 text-end text-lg text-destructive leading-5">
              {response.total_price_apply_discount?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'VND',
              })}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4 gap-4">
        <OrderAction
          orderId={response.id}
          status={response.status}
        />
      </div>
    </div>
  )
}

export default Page
