'use client'

import React, { useRef, useState } from 'react'
import { Button, buttonVariants } from '../ui/button'
import {
  AlignJustify,
  CircleUserRound,
  Database,
  Home,
  Plus,
  ScrollText,
  SquarePen,
  Star,
  Store,
  Ticket,
  User,
  UserRound,
  UserRoundCog,
  Users,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useOnClickOutside } from '@/hooks/use-click-outside'
import { Icons } from '../navbar/Icons'
import Link from 'next/link'

const SideBar = () => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false))

  return (
    <div
      className={cn([
        'fixed md:relative  w-max h-max z-20 top-0 left-0 text-gray-700',
        isOpen ? 'min-w-64' : 'w-14 md:w-0 ',
      ])}
    >
      <div
        className={cn([
          'md:fixed h-max absolute top-3 left-2 md:shadow-md gap-y-2 flex flex-col bg-background transition-all duration-75',
          ,
          isOpen ? 'w-64 p-2 h-screen top-0 left-0' : 'w-14',
        ])}
        ref={ref}
      >
        {isOpen ? (
          <>
            <div className="flex items-center justify-center gap-2 p-2">
              <Icons.logo className="w-10 h-10" />
              <span className="text-lg font-bold">ShopDEV</span>
            </div>
            <Link
              href={'/shop'}
              className={cn([
                buttonVariants({ variant: 'outline' }),
                'flex items-center justify-start gap-2 w-full',
              ])}
            >
              <Store size={18} />
              <span className={cn([isOpen ? '' : 'hidden'])}>Shops</span>
            </Link>
            <Link
              href={'/users'}
              className={cn([
                buttonVariants({ variant: 'outline' }),
                'flex items-center justify-start gap-2 w-full',
              ])}
            >
              <Users size={18} />
              <span className={cn([isOpen ? '' : 'hidden'])}>Users</span>
            </Link>
            <Link
              href={'/orders'}
              className={cn([
                buttonVariants({ variant: 'outline' }),
                'flex items-center justify-start gap-2 w-full',
              ])}
            >
              <ScrollText size={18} />
              <span className={cn([isOpen ? '' : 'hidden'])}>Orders</span>
            </Link>
            <Link
              href={'/report'}
              className={cn([
                'flex items-center !justify-start gap-2 w-full',
                buttonVariants({ variant: 'outline' }),
              ])}
            >
              <AlignJustify size={18} />
              <span className={cn([isOpen ? '' : 'hidden'])}>
                Danh sách báo cáo
              </span>
            </Link>
            <Link
              href={'/vouchers'}
              className={cn([
                'flex items-center !justify-start gap-2 w-full',
                buttonVariants({ variant: 'outline' }),
              ])}
            >
              <Ticket size={18} />
              <span className={cn([isOpen ? '' : 'hidden'])}>
                Mã giảm giá
              </span>
            </Link>
            <div className="flex flex-col gap-2 p-4">
              <h1 className="text-lg font-semibold">Sản phẩm</h1>
              <Link
                href={'/product/list'}
                className={cn([
                  'flex items-center !justify-start gap-2 w-full',
                  buttonVariants({ variant: 'ghost' }),
                ])}
              >
                <AlignJustify size={18} />
                <span className={cn([isOpen ? '' : 'hidden'])}>
                  Danh sách sản phẩm
                </span>
              </Link>
              <Link
                href={'/product/create'}
                className={cn([
                  'flex items-center !justify-start gap-2 w-full',
                  buttonVariants({ variant: 'ghost' }),
                ])}
              >
                <Plus size={18} />
                <span className={cn([isOpen ? '' : 'hidden'])}>
                  Thêm sản phẩm
                </span>
              </Link>

              <Link
                href={'/product/update'}
                className={cn([
                  'flex items-center !justify-start gap-2 w-full',
                  buttonVariants({ variant: 'ghost' }),
                ])}
              >
                <SquarePen size={18} />
                <span className={cn([isOpen ? '' : 'hidden'])}>
                  Cập nhật sản phẩm
                </span>
              </Link>
              <Link
                href={'/product/inventory'}
                className={cn([
                  'flex items-center !justify-start gap-2 w-full',
                  buttonVariants({ variant: 'ghost' }),
                ])}
              >
                <Database size={18} />
                <span className={cn([isOpen ? '' : 'hidden'])}>
                  Kho hàng sản phẩm
                </span>
              </Link>
              <Link
                href={'/product/reviews'}
                className={cn([
                  'flex items-center !justify-start gap-2 w-full',
                  buttonVariants({ variant: 'ghost' }),
                ])}
              >
                <Star size={18} />
                <span className={cn([isOpen ? '' : 'hidden'])}>
                  Đánh giá sản phẩm
                </span>
              </Link>
            </div>
            <Link
              href={'/profile'}
              className={cn([
                buttonVariants({ variant: 'outline' }),
                'flex items-center justify-start gap-2 w-full',
              ])}
            >
              <User size={18} />
              <span className={cn([isOpen ? '' : 'hidden'])}>Profile</span>
            </Link>
          </>
        ) : (
          <Button
            variant={'outline'}
            onClick={() => setOpen(!isOpen)}
            className="flex items-center gap-2 w-full"
          >
            <AlignJustify />
          </Button>
        )}
      </div>
    </div>
  )
}

export default SideBar
