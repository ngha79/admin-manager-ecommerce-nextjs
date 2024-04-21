'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import Review from './Review'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { getListRating } from '@/utils/actions/rating'
import { getSession } from '@/utils/actions/account'
import { toast } from 'sonner'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface IListComment {
  id: string
  content: string
  rating: number
  createdAt: Date
  user: {
    avatar: string
    userName: string
    id: string
    email: string
  }
  shopComment: [
    {
      id: string
      createdAt: Date
      content: string
      images: [
        {
          image_id: string
          image_url: string
        }
      ]
      shop: {
        id: string
        userName: string
        email: string
        avatar: string
      }
    }
  ]
  commentImage: [
    {
      image_id: string
      image_url: string
    }
  ]
}

const ListReview = () => {
  const [listComment, setListComment] = useState<IListComment[]>([])
  const [nextPage, setNextPage] = useState<number | null>(null)
  const [lastPage, setLastPage] = useState<number | null>(null)
  const [order, setOrder] = useState<
    'recent' | 'oldest' | 'highest' | 'lowest'
  >('recent')

  useEffect(() => {
    async function getListComment() {
      const auth = await getSession()
      const response = await getListRating({
        limit: 20,
        page: 1,
        order: order,
        shopId: auth.userId,
      })
      if (response.error) return toast.error(response.message)
      setListComment(response.data)
      setNextPage(response.nextPage)
      setLastPage(response.prevPage)
    }
    getListComment()
  }, [order])

  return (
    <div className="bg-background rounded-md shadow-md">
      <div className="flex items-center justify-between px-8 py-4 border-b">
        <h1 className="text-2xl font-bold">Đánh giá mới nhất</h1>
        <Select
          defaultValue={order}
          onValueChange={(value: 'recent' | 'oldest' | 'highest' | 'lowest') =>
            setOrder(value)
          }
        >
          <SelectTrigger className="w-[180px] font-medium">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent className="font-medium">
            <SelectGroup>
              <SelectItem value="recent">Mới nhất</SelectItem>
              <SelectItem value="oldest">Cũ nhất</SelectItem>
              <SelectItem value="highest">Đánh giá cao nhất</SelectItem>
              <SelectItem value="lowest">Đánh giá thấp nhất</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col">
        {listComment?.map((item) => (
          <Review
            key={item.id}
            review={item}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 p-4">
        <Button
          disabled={!lastPage}
          className="w-8 h-8 flex items-center justify-center p-2 font-bold rounded-md border-blue-500 bg-blue-500"
        >
          <ChevronLeft />
        </Button>

        <Button
          variant={'outline'}
          disabled={!nextPage}
          className="w-8 h-8 flex items-center justify-center p-2 font-bold rounded-md border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

export default ListReview
