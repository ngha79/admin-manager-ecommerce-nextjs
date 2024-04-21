import { useIsVisible } from '@/hooks/useIsVisible'
import React, { useEffect, useRef } from 'react'

const LoadMore = ({
  handleFetchOrders,
}: {
  handleFetchOrders: (visible: boolean) => void
}) => {
  const container = useRef(null)
  const visible = useIsVisible(container)
  useEffect(() => {
    if (visible) handleFetchOrders(visible)
  }, [visible])
  return (
    <div
      ref={container}
      className="flex items-center justify-center pt-8"
    >
      <div
        className="inline-block text-gray-700 h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  )
}

export default LoadMore
