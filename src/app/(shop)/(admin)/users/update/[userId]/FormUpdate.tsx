"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HttpError } from "@/lib/http";
import { cn, ResponseExceptions } from "@/lib/utils";
import { updateProfileUserByAdmin } from "@/utils/actions/user";
import { reFetchUsers } from "@/utils/server";
import { IUser } from "@/utils/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const userValidator = z.object({
  userName: z.string().min(4, { message: "Tên người dùng tối thiểu 4 ký tự." }),
  phoneNumber: z
    .string()
    .length(10, { message: "Số điện thoại không đúng định dạng." }),
});

type TUserValidator = z.infer<typeof userValidator>;

const FormUpdate = ({ user }: { user: IUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const [background, setBackground] = useState<string>("");
  const [fileAvatar, setFileAvatar] = useState<any>(null);
  const [fileBackground, setFileBackground] = useState<any>(null);
  const avatarUser = useRef<HTMLInputElement>(null);
  const backgroundUser = useRef<HTMLInputElement>(null);

  const onUploadAvatar = () => {
    avatarUser?.current?.click();
  };

  const onUploadBackground = () => {
    backgroundUser?.current?.click();
  };

  const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = URL.createObjectURL(e.target.files[0]);
      setAvatar(image);
      setFileAvatar(e.target.files[0]);
    }
  };
  const handleUploadBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = URL.createObjectURL(e.target.files[0]);
      setBackground(image);
      setFileBackground(e.target.files[0]);
    }
  };

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserValidator>({
    resolver: zodResolver(userValidator),
  });

  const onSubmit = async ({ phoneNumber, userName }: TUserValidator) => {
    setIsLoading(true);
    const form = new FormData();
    form.append("userName", userName);
    form.append("phoneNumber", phoneNumber);
    if (fileAvatar) form.append("fileAvatar", fileAvatar);
    if (fileBackground) form.append("fileBackground", fileBackground);
    try {
      await updateProfileUserByAdmin(user.id, form);
      await reFetchUsers();
      toast.success("Cập nhật người dùng thành công.");
      router.replace("/users");
    } catch (error) {
      if (error instanceof HttpError) {
        return toast.error(error.payload.message);
      }
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelUpdateImage = (type?: string) => {
    if (type) {
      setAvatar("");
      setFileAvatar(null);
    } else {
      setBackground("");
      setFileBackground(null);
    }
  };
  return (
    <div className="p-4 flex flex-col max-w-7xl w-full mx-auto gap-4">
      <h1 className="text-lg text-gray-700 font-bold">Tạo người dùng mới</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="****@gmail.com"
              defaultValue={user.email}
              disabled
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <Label htmlFor="userName">Tên người dùng</Label>
            <Input
              placeholder="Nguyễn Văn A"
              {...register("userName")}
              defaultValue={user.userName}
              className={cn({
                "focus-visible:ring-red-500": errors.userName,
              })}
            />
            {errors?.userName && (
              <p className="text-sm text-red-500">{errors.userName.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input type="password" placeholder="************" disabled />
          </div>
          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <Label htmlFor="phoneNumber">Số điện thoại</Label>
            <Input
              placeholder="0123456789"
              {...register("phoneNumber")}
              defaultValue={user.phoneNumber}
              className={cn({
                "focus-visible:ring-red-500": errors.phoneNumber,
              })}
            />
            {errors?.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="thumb">Avatar</Label>
          <Input
            type="file"
            className="hidden"
            ref={avatarUser}
            onChange={handleUploadAvatar}
          />
          <div className="flex items-center flex-col justify-center gap-4">
            <div
              className="lg:w-64 md:w-52 md:h-52 w-40 rounded-full lg:h-64 h-40 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 shadow-lg relative"
              onClick={onUploadAvatar}
            >
              <Image
                alt="avatar user"
                src={avatar || user.avatar}
                fill
                className="lg:w-64 md:w-52 md:h-52 w-40 hover:opacity-90 rounded-full lg:h-64 h-40 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 shadow-lg relative"
              />
              <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="space-x-4">
              <Button onClick={onUploadAvatar} type="button">
                Thay ảnh
              </Button>
              {avatar ? (
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={() => handleCancelUpdateImage("avatar")}
                >
                  Hủy
                </Button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="thumb">Background</Label>
          <Input
            type="file"
            className="hidden"
            ref={backgroundUser}
            onChange={handleUploadBackground}
          />
          <div className="flex items-center flex-col justify-center gap-4">
            <div
              className="lg:w-72 md:w-64 md:h-48 w-52 lg:h-56 h-40 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 rounded-md shadow-lg relative"
              onClick={onUploadBackground}
            >
              <Image
                alt="avatar user"
                src={background || user.background}
                fill
                className="lg:w-72 md:w-64 md:h-48 w-52 lg:h-56 h-40 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 rounded-md shadow-lg relative"
              />
              <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="space-x-4">
              <Button onClick={onUploadBackground} type="button">
                Thay ảnh
              </Button>
              {background ? (
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={() => handleCancelUpdateImage()}
                >
                  Hủy
                </Button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? <Loading /> : null}
            Cập nhật
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            variant={"destructive"}
            onClick={() => router.replace("/users")}
            className="flex items-center gap-2"
          >
            {isLoading ? <Loading /> : null}
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormUpdate;
