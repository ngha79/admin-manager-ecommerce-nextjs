'use client'

import {
  TAuthCredentialsValidator,
  AuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })
  const router = useRouter()
  const signUp = async (
    authCredentialsValidator: TAuthCredentialsValidator
  ) => {
    try {
      const res = await fetch('http://localhost:8000/shop', {
        method: 'POST',
        body: JSON.stringify(authCredentialsValidator),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const account = await res.json()
      if (!res.ok) throw account
      return account
    } catch (error: any) {
      if (error.message && typeof error.message == 'string') {
        toast.error(error.message)
        return
      }
      toast.error('Không thể đăng ký, vui lòng thử lại sau.')
      return
    }
  }
  const onSubmit = async ({
    email,
    password,
    phoneNumber,
    userName,
  }: TAuthCredentialsValidator) => {
    setIsLoading(true)
    const account = await signUp({ email, password, phoneNumber, userName })
    setIsLoading(false)
    if (account) {
      toast.success('Đăng ký tài khoản thành công.')
      router.push('/login')
    }
  }
  return (
    <div className="container relative h-full flex-grow flex flex-col items-center justify-center lg:px-0">
      <div className="max-w-lg w-full flex flex-col items-center space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Đăng ký tài khoản bán hàng
        </h1>
      </div>

      <div className="grid gap-6 max-w-lg w-full">
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
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="grid gap-1 py-2">
              <Label htmlFor="userName">Tên shop</Label>
              <Input
                {...register('userName')}
                type="text"
                className={cn({
                  'focus-visible:ring-red-500': errors.password,
                })}
                placeholder="Password"
              />
              {errors?.userName && (
                <p className="text-sm text-red-500">
                  {errors.userName.message}
                </p>
              )}
            </div>
            <div className="grid gap-1 py-2">
              <Label htmlFor="phoneNumber">Số điện thoại</Label>
              <Input
                {...register('phoneNumber')}
                type="text"
                className={cn({
                  'focus-visible:ring-red-500': errors.password,
                })}
                placeholder="Password"
              />
              {errors?.phoneNumber && (
                <p className="text-sm text-red-500">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Đăng ký
            </Button>
          </div>
        </form>
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center"
          >
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500">
          <Link
            className={buttonVariants({
              variant: 'link',
              className: 'gap-1.5',
            })}
            href="/login"
          >
            Bạn đã có tài khoản
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
