'use client'

import { Star } from 'lucide-react'
import React from 'react'
import { Progress } from '../ui/progress'

const ReviewRateItem = ({ star, value }: { star: number; value: any }) => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="flex items-center gap-4 flex-1">
      <div className="flex items-center gap-1 text-gray-700">
        <span className="font-bold">{star}</span>
        <Star
          size={18}
          fill="#fcd34d"
          className="text-yellow-300"
        />
      </div>
      <Progress
        value={progress}
        color="#fcd34d"
        className="w-full"
      />
      <span className="font-bold">{value}%</span>
    </div>
  )
}

export default ReviewRateItem
