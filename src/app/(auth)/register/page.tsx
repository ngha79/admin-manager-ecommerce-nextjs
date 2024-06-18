"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight, Loader2 } from "lucide-react";

import {
  TAuthCredentialsValidator,
  AuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { HttpError } from "@/lib/http";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import authApiRequest from "@/apiRequests/auth";
import { cn, ResponseExceptions } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@/components/ui/button";

const Register = () => {
  const [isLoading, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });
  const router = useRouter();

  const onSubmit = async ({
    email,
    password,
    phoneNumber,
    userName,
  }: TAuthCredentialsValidator) => {
    startTransition(async () => {
      try {
        await authApiRequest.registerShop({
          email,
          password,
          phoneNumber,
          userName,
        });
        router.push("/login");
        toast.success("Đăng ký tài khoản thành công.");
      } catch (error: any) {
        if (error instanceof HttpError) {
          toast.error(error.payload.message);
        } else {
          toast.error(ResponseExceptions.DEFAULT_ERROR);
        }
      }
    });
  };
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
                {...register("email")}
                className={cn({
                  "focus-visible:ring-red-500": errors.email,
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
                {...register("password")}
                type="password"
                className={cn({
                  "focus-visible:ring-red-500": errors.password,
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
                {...register("userName")}
                type="text"
                className={cn({
                  "focus-visible:ring-red-500": errors.password,
                })}
                placeholder="User Shop"
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
                {...register("phoneNumber")}
                type="text"
                className={cn({
                  "focus-visible:ring-red-500": errors.password,
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
              variant: "link",
              className: "gap-1.5",
            })}
            href="/login"
          >
            Bạn đã có tài khoản
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
