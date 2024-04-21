'use client'

import { Button } from '@/components/ui/button'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="w-full">
      <div className="min-h-[500px] flex text-destructive font-medium text-lg flex-col items-center justify-center gap-y-4">
        Có lỗi xảy ra vui lòng thử lại sau.
        <Button
          variant={'destructive'}
          onClick={reset}
        >
          Tải lại
        </Button>
      </div>
    </div>
  )
}

export default Error
