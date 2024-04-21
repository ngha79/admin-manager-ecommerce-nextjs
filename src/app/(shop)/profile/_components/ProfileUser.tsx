'use client'

import { Button } from '@/components/ui/button'
import { updateAvatarShop, updateBackgroundShop } from '@/utils/actions/shop'
import { Mail, Phone, UserRoundCheck, Users } from 'lucide-react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner'

interface IProfileUser {
  avatar: string
  background: string
  userName: string
  phoneNumber: string
  email: string
  followers: any[]
  createdAt: string
}

const ProfileUser = ({
  avatar,
  background,
  userName,
  email,
  followers,
  createdAt,
}: IProfileUser) => {
  const [fileAvatar, setFileAvatar] = useState<File | null>(null)
  const [imageAvatar, setImageAvatar] = useState<string>('')
  const [imageBackground, setImageBackground] = useState<string>('')
  const [fileBackground, setFileBackground] = useState<File | null>(null)
  const ref = useRef(null)
  const refBackground = useRef(null)

  const target = () => {
    ref.current?.click()
  }

  const targetBackground = () => {
    refBackground.current?.click()
  }

  const handleSetFileAvatar = (e) => {
    if (e.target.files) {
      const image = URL.createObjectURL(e.target.files[0])
      setImageAvatar(image)
      setFileAvatar(e.target.files[0])
    }
  }

  const handleSetFileBackground = (e) => {
    if (e.target.files) {
      const image = URL.createObjectURL(e.target.files[0])
      setImageBackground(image)
      setFileBackground(e.target.files[0])
    }
  }

  const handleCancelAvatar = () => {
    setImageAvatar('')
    setFileAvatar(null)
  }

  const handleCancelBackground = () => {
    setImageBackground('')
    setFileBackground(null)
  }

  const handleUpdateAvatar = async () => {
    const form = new FormData()
    if (!fileAvatar) return
    form.append('file', fileAvatar)
    setImageAvatar('')
    setFileAvatar(null)
    const response = await updateAvatarShop(form)
    if (response.error) return toast.error(response.message)
    toast.success('Cập nhật Avatar thành công.')
  }

  const handleUpdateBackground = async () => {
    const form = new FormData()
    if (!fileBackground) return
    form.append('file', fileBackground)
    setImageAvatar('')
    setFileBackground(null)
    const response = await updateBackgroundShop(form)
    if (response.error) return toast.error(response.message)
    toast.success('Cập nhật Background thành công.')
  }

  return (
    <div className="flex flex-col gap-4 items-center rounded-md justify-center w-full md:max-w-sm bg-background py-12 px-4">
      <div className="w-full h-40 relative flex items-center justify-center border rounded-md shadow-md">
        <Image
          alt="background"
          src={imageBackground || background}
          fill
          className="absolute top-0 left-0 z-0"
        />
        <div className="w-20 h-20 z-10 relative bg-red-200 shadow-lg rounded-full overflow-hidden border cursor-pointer flex items-center justify-center">
          <Image
            alt="avatar"
            src={imageAvatar || avatar}
            fill
          />
        </div>
      </div>
      <input
        type="file"
        name=""
        className="hidden"
        ref={ref}
        onChange={handleSetFileAvatar}
        id=""
      />
      <input
        type="file"
        name=""
        className="hidden"
        ref={refBackground}
        onChange={handleSetFileBackground}
        id=""
      />
      <div className="flex items-center gap-4">
        {!fileAvatar ? (
          <Button onClick={target}>Thay đổi Avatar</Button>
        ) : (
          <>
            <Button
              onClick={handleCancelAvatar}
              variant={'destructive'}
            >
              Hủy
            </Button>
            <Button
              onClick={handleUpdateAvatar}
              variant={'success'}
            >
              Cập nhật
            </Button>
          </>
        )}
        {!fileBackground ? (
          <Button onClick={targetBackground}>Thay đổi Background</Button>
        ) : (
          <>
            <Button
              onClick={handleCancelBackground}
              variant={'destructive'}
            >
              Hủy
            </Button>
            <Button
              onClick={handleUpdateBackground}
              variant={'success'}
            >
              Cập nhật
            </Button>
          </>
        )}
      </div>
      <span className="md:text-lg font-medium">{userName}</span>
      <span className="text-gray-700 flex items-center gap-2">
        <Users size={18} /> Theo dõi:{' '}
        <span className="text-destructive">{followers?.length}</span>
      </span>
      <span className="text-gray-700 flex items-center gap-2">
        <UserRoundCheck size={18} />
        <span className="line-clamp-1 w-max">Đã tham gia:</span>
        <span className="text-destructive line-clamp-1 w-16">
          {Date(createdAt)}
        </span>
      </span>
    </div>
  )
}

export default ProfileUser
