'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { MessageSquareShare, Star, Trash, Upload } from 'lucide-react'
import Image from 'next/image'
import { IListComment } from './ListReview'
import { Input } from '../ui/input'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { createCommentReplyUser } from '@/utils/actions/rating'

export function ReviewDetail({ review }: { review: IListComment }) {
  const [image, setImage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const [file, setFile] = useState<any | null>(null)
  const ref = useRef<HTMLInputElement>(null)
  const onUploadImage = () => {
    ref?.current?.click()
  }
  const handleUploadThumb = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = URL.createObjectURL(e.target.files[0])
      setImage(image)
      setFile(e.target.files[0])
    }
  }

  const handleDeleteImageUpload = () => {
    setImage('')
    setFile(null)
  }

  const handleCreateCommentFeedbackForUser = async (e) => {
    e.preventDefault()
    if (!file && !comment) return
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('content', comment)
    formData.append('commentId', review.id)
    const response = await createCommentReplyUser(formData)
    setLoading(false)
    if (response.error) return toast.error(response.message)
    setFile(null)
    setImage('')
    setComment('')
    toast.success('Phản hồi thành công.')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <MessageSquareShare
            className="text-blue-500"
            size={18}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <div className="grid p-4 gap-4">
          <div className="flex items-center gap-4">
            <Image
              alt="avatar user review"
              src={review.user.avatar}
              width={60}
              height={60}
              className="border w-16 h-16 rounded-full"
            />
            <div className="flex flex-col">
              <h1 className="font-bold">{review.user.userName}</h1>
              <a
                href={`mailto:${review.user.email}`}
                className="relative inline-block"
              >
                <span className="font-medium text-sm relative text-blue-600 after:absolute after:w-0 after:h-[1px] after:block after:left-0 after:bg-blue-500 hover:after:w-full hover:after:left-0 hover:after:bg-blue-500 after:transition-width after:duration-200 after:ease-in">
                  {review.user.email}
                </span>
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Label>Thời gian:</Label>
            <span className="text-sm">21/03/2024, 02:31 PM</span>
          </div>
          <div className="flex items-center gap-4">
            <Label>Đánh giá:</Label>
            <div className="grid gap-2 grid-flow-col">
              {Array.from({ length: review.rating }).map((item, index) => (
                <Star
                  key={index}
                  size={18}
                  fill="#fcd34d"
                  className="text-amber-300"
                />
              ))}
              {Array.from({ length: 5 - review.rating }).map((item, index) => (
                <Star
                  key={index}
                  size={18}
                  className="text-amber-300"
                />
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <Label>Đánh giá:</Label>
            <div className="flex flex-wrap gap-2">
              {review.commentImage.map((item, index) => (
                <Image
                  alt="avatar user review"
                  src={item.image_url}
                  width={120}
                  key={index}
                  height={120}
                  className="border rounded-sm max-w-60 max-h-60 w-auto h-auto"
                />
              ))}
            </div>
          </div>
          <div className="rounded-md border p-2 font-medium text-sm">
            {review.content}
          </div>
        </div>
        {!review.shopComment.length ? null : (
          <div className="flex flex-col gap-2 px-4">
            <h1 className="font-medium">Phản hồi đánh giá người dùng</h1>
            {review.shopComment.map((item) => (
              <div className="flex items-start gap-4">
                <Image
                  alt="avatar user review"
                  src={item.shop.avatar}
                  width={40}
                  height={40}
                  className="border w-12 h-12 rounded-full"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium text-sm">{item.shop.userName}</h3>
                  <span className="text-sm text-gray-800">{item.content}</span>
                  {item.images.length ? (
                    <div className="flex flex-col gap-2">
                      <Label>Ảnh</Label>
                      <div className="flex flex-wrap gap-2">
                        {item.images.map((item) => (
                          <Image
                            alt="image"
                            src={item.image_url}
                            width={120}
                            height={120}
                            className="border max-w-32 max-h-32 w-auto h-auto"
                          />
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-4 m-4">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="image-upload"
              className="flex items-center gap-2"
              onClick={onUploadImage}
            >
              <span>Ảnh</span>
              <Upload />
            </Label>
            <Input
              type="file"
              className="hidden"
              ref={ref}
              onChange={handleUploadThumb}
              multiple
            />
            <div className="flex gap-2 flex-wrap">
              {image ? (
                <div
                  className="relative"
                  onClick={handleDeleteImageUpload}
                >
                  <Image
                    alt="image feedback user"
                    src={image}
                    width={120}
                    height={120}
                    className="max-w-32 max-h-32 w-auto h-auto"
                  />
                  <div className="absolute cursor-pointer flex z-[4] group items-center justify-center top-0 left-0 w-full h-full hover:bg-gray-200/70">
                    <Trash className="group-hover:block hidden text-red-500/70" />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="input">Phản hồi đánh giá người dùng</Label>
            <textarea
              id="input"
              className="border rounded-md p-2"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            disabled={loading}
            onClick={handleCreateCommentFeedbackForUser}
          >
            Phản hồi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
