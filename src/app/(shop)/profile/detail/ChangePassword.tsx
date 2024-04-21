'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
  IPasswordUserValidator,
  PasswordUserValidator,
} from '@/lib/validators/account-credentials-validator'
import { logout } from '@/utils/actions/account'
import { changePasswordShop } from '@/utils/actions/shop'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordUserValidator>({
    resolver: zodResolver(PasswordUserValidator),
  })
  const handleLogout = async () => {
    await logout()
  }

  const onSubmit = async ({
    currentPassword,
    newPassword,
  }: IPasswordUserValidator) => {
    setIsLoading(true)
    const res = await changePasswordShop({ currentPassword, newPassword })
    setIsLoading(false)
    if (res.error) {
      return toast.error(res.message)
    }
    handleLogout()
    return toast.success('Cập nhật thông tin thành công')
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mật khẩu</CardTitle>
        <CardDescription>
          Thay đổi mật khẩu của bạn ở đây. Sau khi lưu, bạn sẽ đăng xuất.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
          <Input
            id="currentPassword"
            type="password"
            {...register('currentPassword')}
            className={cn({
              'focus-visible:ring-red-500': errors.currentPassword,
            })}
          />
          {errors?.currentPassword && (
            <p className="text-sm text-red-500">
              {errors.currentPassword.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="newPassword">Mật khẩu mới</Label>
          <Input
            id="newPassword"
            type="password"
            {...register('newPassword')}
            className={cn({
              'focus-visible:ring-red-500': errors.newPassword,
            })}
          />
          {errors?.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword.message}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Lưu mật khẩu
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ChangePassword
