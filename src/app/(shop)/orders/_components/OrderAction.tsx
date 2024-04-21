'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { updateOrder } from '@/utils/actions/orders'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const OrderAction = ({
  orderId,
  status,
  detail,
}: {
  orderId: string
  status: string
  detail?: boolean
}) => {
  const [statusOrder, setStatus] = useState<string>(status)
  const [isLoading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleUpdateStatus = async (type: string) => {
    setLoading(true)
    const response = await updateOrder({
      id: orderId,
      status: type,
    })
    setLoading(false)
    if (response.error) return toast.error(response.message)
    setStatus(response.status)
    return toast.success('Cập nhật đơn hàng thành công.')
  }

  const ActionOrder: any = {
    pending: () => {
      return (
        <>
          <Button
            variant={'destructive'}
            onClick={() => handleUpdateStatus('cancelled')}
            disabled={isLoading}
          >
            Hủy
          </Button>
          <Button
            onClick={() => handleUpdateStatus('confirmed')}
            disabled={isLoading}
          >
            Xác nhận
          </Button>
        </>
      )
    },
    cancelled: () => {
      return (
        <>
          <Button
            variant={'destructive'}
            disabled
          >
            Đã hủy
          </Button>
        </>
      )
    },
    confirmed: () => {
      return (
        <>
          <Button
            variant={'destructive'}
            onClick={() => handleUpdateStatus('cancelled')}
            disabled={isLoading}
          >
            Hủy đơn hàng
          </Button>
          <Button
            onClick={() => handleUpdateStatus('shipping')}
            disabled={isLoading}
          >
            Chuyển hàng
          </Button>
        </>
      )
    },
    shipping: () => {
      return (
        <>
          <Button
            variant={'destructive'}
            onClick={() => handleUpdateStatus('cancelled')}
            disabled={isLoading}
          >
            Hủy đơn hàng
          </Button>
          <Button
            onClick={() => handleUpdateStatus('delivered')}
            variant={'success'}
            disabled={isLoading}
          >
            Đã giao hàng
          </Button>
        </>
      )
    },
    delivered: () => {
      return (
        <Button
          onClick={() => handleUpdateStatus('delivered')}
          variant={'success'}
          disabled
        >
          Đã giao hàng
        </Button>
      )
    },
  }
  return (
    <div className="space-x-4 flex justify-end">
      {detail ? (
        <Link
          href={`/orders/${orderId}`}
          className={cn([buttonVariants()])}
        >
          Chi tiết
        </Link>
      ) : null}
      {ActionOrder?.[statusOrder]()}
      {!detail ? (
        <Button
          variant={'destructive'}
          className="w-max"
          onClick={() => router.push('/orders')}
        >
          Trở về
        </Button>
      ) : null}
    </div>
  )
}

export default OrderAction
