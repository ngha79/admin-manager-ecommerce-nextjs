import { profileShop } from '@/utils/actions/shop'
import { Star, Store, UserRoundCheck, Users } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const Page = async () => {
  const profile = await profileShop()
  if (profile.error) throw new Error(profile.message)
  return (
    <div className="flex flex-col gap-4 py-8 px-4 flex-1 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 h-max">
        <div className="md:max-w-md w-full rounded-md shadow-md flex items-center gap-4 h-max">
          <div className="w-full h-40 relative flex items-center justify-center rounded-md shadow-md gap-4">
            <Image
              alt="background"
              src={profile.background}
              fill
              sizes="32"
              className="absolute top-0 rounded-md left-0 z-0 blur-[1px]"
            />
            <div className="w-20 h-20 z-10 relative shadow-lg rounded-full overflow-hidden border cursor-pointer flex items-center justify-center">
              <Image
                alt="avatar"
                src={profile.avatar}
                fill
              />
            </div>
            <div className="flex flex-col gap-1 z-10">
              <h1 className="md:text-lg font-medium text-background line-clamp-1">
                {profile.userName}
              </h1>
            </div>
          </div>
        </div>
        <div className="grid h-full min-h-32 p-3 grid-rows-2 gap-2 w-full px-8 bg-background rounded-md shadow-md">
          <div className="grid sm:grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-sm ">
              <span className="flex items-center gap-2 text-gray-700">
                <Store size={18} />
                <span className="line-clamp-1">Sản Phẩm Của Bạn:</span>
              </span>
              <span className="text-destructive line-clamp-1">4</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-2 text-gray-700">
                <Users size={18} />
                <span className="line-clamp-1">Người Theo Dõi:</span>
              </span>
              <span className="text-destructive line-clamp-1">
                {profile?.followers?.length}
              </span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-2 text-gray-700">
                <Star size={18} />
                <span className="line-clamp-1">Được Đánh Giá:</span>
              </span>
              <span className="text-destructive line-clamp-1">
                4.9 (240,3k Đánh Giá)
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-2 text-gray-700">
                <UserRoundCheck size={18} />
                <span className="line-clamp-1">Bạn Tham Gia:</span>
              </span>
              <span className="text-destructive line-clamp-1">
                {formatDistanceToNow(new Date(profile.createdAt), {
                  addSuffix: true,
                  locale: vi,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Link
        href={'/profile/update'}
        className={cn([buttonVariants({ size: 'sm' }), 'max-sm:text-xs'])}
      >
        Cập nhật thông tin Shop
      </Link>
      <div className="space-y-4">
        <h1 className="text-lg font-medium">Giới thiệu về Shop</h1>
        <div dangerouslySetInnerHTML={{ __html: profile.description }} />
      </div>
    </div>
  )
}

export default Page
