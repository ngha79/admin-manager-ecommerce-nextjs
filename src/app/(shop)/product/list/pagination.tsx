'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Pagination = ({ totalPage }: { totalPage: number | null }) => {
  if (!totalPage) return null
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  let page = Number(searchParams.get('page')) || 1
  const handleSetNextPage = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (page < totalPage) {
      params.set('page', `${page + 1}`)
      router.replace(`${pathname}?${params.toString()}`)
    }
  }
  const handleSetPrevPage = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (page > 1) {
      params.set('page', `${page - 1}`)
      router.replace(`${pathname}?${params.toString()}`)
    }
  }
  return (
    <div
      className={cn([
        'flex items-center gap-4 flex-1 justify-center w-full',
        totalPage ? '' : 'hidden',
      ])}
    >
      <div className="border bg-background rounded-md shadow-sm flex items-center">
        <Button
          className={cn([
            'p-2 border-r',
            page > 1
              ? 'hover:bg-blue-500 bg-blue-600'
              : 'text-gray-300 bg-transparent hover:bg-transparent',
          ])}
          onClick={handleSetPrevPage}
          disabled={page < 2}
        >
          <ChevronLeft />
        </Button>
        <span className="flex items-center px-4">
          <p>{page}</p>/{totalPage}
        </span>
        <Button
          className={cn([
            'p-2 border-l',
            page < totalPage
              ? 'hover:bg-blue-500 bg-blue-600'
              : 'text-gray-300 bg-transparent hover:bg-transparent',
          ])}
          disabled={page >= totalPage}
          onClick={handleSetNextPage}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

export default Pagination
