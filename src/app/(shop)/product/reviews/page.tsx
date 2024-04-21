import ListReview from '@/components/reviews/ListReview'
import ReviewRate from '@/components/reviews/ReviewRate'
import { getRatingShop } from '@/utils/actions/rating'
import { Star, Users } from 'lucide-react'
import React from 'react'

interface IRating {
  rating: number
  count: number
}

const Page = async () => {
  const response = await getRatingShop()
  if (response.error) throw new Error(response.message)
  const totalRating = response.reduce(
    (total: number, item: IRating) => (total += item.count),
    0
  )
  const ratingAverage =
    response.reduce(
      (total: number, item: IRating) => (total += item.count * item.rating),
      0
    ) / totalRating || 0
  return (
    <div className="flex flex-col p-4 container gap-4">
      <h1 className="text-2xl font-bold">Đánh giá sản phẩm</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 md:col-span-2 p-8 items-start md:items-center justify-center lg:col-span-1 bg-background rounded-md shadow-md flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2 text-yellow-300 h-9">
            <Star
              size={16}
              fill="#fcd34d"
            />
            <Star
              size={16}
              fill="#fcd34d"
            />
            <Star
              size={16}
              fill="#fcd34d"
            />
            <Star
              size={16}
              fill="#fcd34d"
            />
            <Star
              size={16}
              fill="#fcd34d"
            />
          </div>
          <h1 className="text-4xl font-bold">{ratingAverage}</h1>
          <span className="text-lg font-semibold">Đánh giá</span>
        </div>
        <div className="col-span-4 md:col-span-2 p-8 items-start md:items-center justify-center lg:col-span-1 bg-background rounded-md shadow-md flex flex-col gap-2">
          <div className="bg-green-700 p-2 rounded-md w-max text-white">
            <Users size={20} />
          </div>
          <h1 className="text-4xl font-bold">{totalRating}</h1>
          <span className="text-lg font-semibold">Tất cả đánh giá</span>
        </div>
        <ReviewRate
          rating={response}
          totalRating={totalRating}
        />
      </div>
      <ListReview />
    </div>
  )
}

export default Page
