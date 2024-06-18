"use client";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  IPasswordUserValidator,
  PasswordUserValidator,
} from "@/lib/validators/account-credentials-validator";
import { HttpError } from "@/lib/http";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { logout } from "@/utils/actions/account";
import { cn, ResponseExceptions } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordShop } from "@/utils/actions/shop";

const ChangePassword = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordUserValidator>({
    resolver: zodResolver(PasswordUserValidator),
  });

  const onSubmit = async ({
    currentPassword,
    newPassword,
  }: IPasswordUserValidator) => {
    startTransition(async () => {
      try {
        await changePasswordShop({ currentPassword, newPassword });
        toast.success("Cập nhật thông tin thành công");
        await logout();
        router.push("/login");
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
            {...register("currentPassword")}
            className={cn({
              "focus-visible:ring-red-500": errors.currentPassword,
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
            {...register("newPassword")}
            className={cn({
              "focus-visible:ring-red-500": errors.newPassword,
            })}
          />
          {errors?.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword.message}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={isPending} onClick={handleSubmit(onSubmit)}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Lưu mật khẩu
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChangePassword;
