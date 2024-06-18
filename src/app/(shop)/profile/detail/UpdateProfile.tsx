"use client";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HttpError } from "@/lib/http";
import { reFetchShop } from "@/utils/server";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn, ResponseExceptions } from "@/lib/utils";
import {
  IProfileUserValidator,
  ProfileUserValidator,
} from "@/lib/validators/account-credentials-validator";
import { updateProfileShop } from "@/utils/actions/shop";

const UpdateProfile = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileUserValidator>({
    resolver: zodResolver(ProfileUserValidator),
  });

  const onSubmit = async ({ userName, phoneNumber }: IProfileUserValidator) => {
    startTransition(async () => {
      try {
        await updateProfileShop({ userName, phoneNumber });
        await reFetchShop();
        toast.success("Cập nhật thông tin thành công");
        router.replace("/profile");
      } catch (error) {
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
            {...register("userName")}
            className={cn({
              "focus-visible:ring-red-500": errors.userName,
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
            {...register("phoneNumber")}
            className={cn({
              "focus-visible:ring-red-500": errors.phoneNumber,
            })}
          />
          {errors?.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={isPending} onClick={handleSubmit(onSubmit)}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Lưu thay đổi
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpdateProfile;
