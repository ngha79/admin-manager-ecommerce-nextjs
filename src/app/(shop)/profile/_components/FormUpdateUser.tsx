import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

interface IProfileUser {
  avatar: string
  background: string
  userName: string
  phoneNumber: string
  email: string
}

const FormUpdateUser = ({ userName, phoneNumber, email }: IProfileUser) => {
  return (
    <div className="w-full bg-background rounded-md px-4 py-12 shadow-sm">
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1 py-2">
            <Label htmlFor="userName">Tên người dùng</Label>
            <Input
              defaultValue={userName}
              disabled
            />
          </div>
          <div className="grid gap-1 py-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              disabled
              placeholder="you@example.com"
            />
          </div>
          <div className="grid gap-1 py-2">
            <Label htmlFor="phoneNumber">Số điện thoại</Label>
            <Input
              defaultValue={phoneNumber}
              placeholder="0123456789"
            />
          </div>
          <div className="grid gap-1 py-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              disabled
              defaultValue={'************'}
              placeholder="Password"
            />
          </div>
          <Link
            href={'/profile/detail'}
            className={cn([buttonVariants({})])}
          >
            Thay đổi
          </Link>
        </div>
      </form>
    </div>
  )
}

export default FormUpdateUser
