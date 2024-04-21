import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import FormLogin from './form'

const Login = () => {
  return (
    <div className="container relative h-full flex-grow flex flex-col items-center justify-center lg:px-0">
      <div className="max-w-md w-full flex flex-col items-center space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Đăng nhập</h1>
      </div>

      <div className="max-w-md w-full grid gap-6">
        <FormLogin />
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
            href="/register"
          >
            Đăng ký tài khoản bán hàng?
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
