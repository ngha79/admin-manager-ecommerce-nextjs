'use client'

import ProductOrder from './ProductOrder'
import OrderAction from './OrderAction'

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

const Order = ({ order }: { order: any }) => {
  return (
    <div className="w-full space-y-4 bg-background rounded-md shadow-md p-4">
      <div className="flex items-center gap-4 justify-between">
        <div className="text-gray-700 font-medium flex items-center gap-2">
          <span className="min-w-max line-clamp-1">Mã đơn hàng:</span>
          <span className="line-clamp-1">{order.tracking_number}</span>
        </div>
        <div className="flex justify-end">{StatusOrder[order?.status]}</div>
      </div>
      <div className="flex flex-col gap-2">
        {order?.order?.map((item: any) => (
          <ProductOrder
            orderItem={item}
            key={item.id}
          />
        ))}
      </div>
      <div className="grid grid-cols-5">
        <div
          aria-hidden
          className="col-span-3"
        />
        <div className="col-span-2 flex flex-col text-sm">
          <div className="grid grid-cols-2">
            <div className="text-start">Tổng tiền:</div>
            <div className="text-center">
              {order?.total_price?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'VND',
              })}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="text-start">Tiền giảm giá:</div>
            <div className="text-center">
              {order?.total_price?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'VND',
              })}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="text-start">Thanh toán:</div>
            <div className="text-center text-destructive">
              {order?.total_price_apply_discount?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'VND',
              })}
            </div>
          </div>
        </div>
      </div>
      <OrderAction
        detail={true}
        orderId={order.id}
        status={order.status}
      />
    </div>
  )
}

export default Order
