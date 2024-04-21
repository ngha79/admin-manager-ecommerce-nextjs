'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  IProfileUserValidator,
  ProfileUserValidator,
} from '@/lib/validators/account-credentials-validator'
import { updateProfileShop } from '@/utils/actions/shop'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface IProfileUser {
  avatar: string
  background: string
  userName: string
  phoneNumber: string
  email: string
}

const UpdateProfile = ({
  userName,
  phoneNumber,
}: {
  userName: string
  phoneNumber: string
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileUserValidator>({
    resolver: zodResolver(ProfileUserValidator),
  })

  const onSubmit = async ({ userName, phoneNumber }: IProfileUserValidator) => {
    setIsLoading(true)
    const res = await updateProfileShop({ userName, phoneNumber })
    setIsLoading(false)
    if (res.error) {
      return toast.error(res.message)
    }
    return toast.success('Cập nhật thông tin thành công')
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tài khoản</CardTitle>
        <CardDescription>
          Thực hiện thay đổi cho tài khoản của bạn tại đây. Nhấp vào lưu khi bạn
          hoàn tất.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="userName">Tên</Label>
          <Input
            id="userName"
            defaultValue={userName}
            {...register('userName')}
            className={cn({
              'focus-visible:ring-red-500': errors.userName,
            })}
          />
          {errors?.userName && (
            <p className="text-sm text-red-500">{errors.userName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="phoneNumber">Số điện thoại</Label>
          <Input
            id="phoneNumber"
            {...register('phoneNumber')}
            className={cn({
              'focus-visible:ring-red-500': errors.phoneNumber,
            })}
            defaultValue={phoneNumber}
          />
          {errors?.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Lưu thay đổi
        </Button>
      </CardFooter>
    </Card>
  )
}

export default UpdateProfile
