'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  IAuthLoginCredentialsValidator,
  AuthLoginCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { login } from '@/utils/actions/account'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const FormLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthLoginCredentialsValidator>({
    resolver: zodResolver(AuthLoginCredentialsValidator),
  })
  const onSubmit = async ({
    email,
    password,
  }: IAuthLoginCredentialsValidator) => {
    setIsLoading(true)
    const res = await login({ email, password })
    setIsLoading(false)
    if (res.message && typeof res.message == 'string') {
      toast.error(res.message || 'Không thể đăng ký, vui lòng thử lại sau.')
      return
    }
    router.push('/')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <div className="grid gap-1 py-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register('email')}
            className={cn({
              'focus-visible:ring-red-500': errors.email,
            })}
            placeholder="you@example.com"
          />
          {errors?.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-1 py-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            {...register('password')}
            type="password"
            className={cn({
              'focus-visible:ring-red-500': errors.password,
            })}
            placeholder="Password"
          />
          {errors?.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Đăng nhập
        </Button>
      </div>
    </form>
  )
}

export default FormLogin
