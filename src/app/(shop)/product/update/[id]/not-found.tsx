import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center gap-4 justify-center flex-col w-full h-screen-layout">
      <h2 className="text-2xl font-medium ">Không tìm thấy</h2>
      <p className="text-gray-600">Không thể tìm thấy sản phẩm được yêu cầu</p>
      <Link
        className={cn([buttonVariants()])}
        href="/product/list"
      >
        Quay lại
      </Link>
    </div>
  )
}
