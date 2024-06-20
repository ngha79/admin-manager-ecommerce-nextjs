// @ts-nocheck
"use client";

import { z } from "zod";
import { toast } from "sonner";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import http from "@/lib/http";
import { cn } from "@/lib/utils";
import Loading from "@/components/Loading";
import { IShop } from "@/utils/types/shop";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { reFetchShops } from "@/utils/server";
import { updateProfileShopByAdmin } from "@/utils/actions/shop";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const shopValidator = z.object({
  userName: z.string().min(4, { message: "Tên người dùng tối thiểu 4 ký tự." }),
  phoneNumber: z
    .string()
    .length(10, { message: "Số điện thoại không đúng định dạng." }),
});

type TUserValidator = z.infer<typeof shopValidator>;

const FroalaEditor = dynamic(
  () => {
    return Promise.all([
      import("react-froala-wysiwyg"),
      import("froala-editor/css/froala_editor.pkgd.min.css"),
      import("froala-editor/css/froala_style.min.css"),
      import("froala-editor/js/plugins/image.min.js"),
      import("froala-editor/js/plugins.pkgd.min.js"),
    ]).then(([module]) => module);
  },
  {
    ssr: false,
  }
);

const FroalaEditorView = dynamic(
  () => {
    return Promise.all([
      import("react-froala-wysiwyg/FroalaEditorView"),
      import("froala-editor/css/froala_editor.pkgd.min.css"),
      import("froala-editor/css/froala_style.min.css"),
      import("froala-editor/js/plugins/image.min.js"),
      import("froala-editor/js/plugins.pkgd.min.js"),
    ]).then(([module]) => module);
  },
  {
    ssr: false,
  }
);

const FormUpdate = ({ user }: { user: IShop }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const [background, setBackground] = useState<string>("");
  const [description, setDescription] = useState<string>(user.description);
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
    resolver: zodResolver(shopValidator),
  });

  const onSubmit = async ({ phoneNumber, userName }: TUserValidator) => {
    setIsLoading(true);
    const form = new FormData();
    form.append("userName", userName);
    form.append("phoneNumber", phoneNumber);
    form.append("description", description);
    if (fileAvatar) form.append("fileAvatar", fileAvatar);
    if (fileBackground) form.append("fileBackground", fileBackground);
    try {
      await updateProfileShopByAdmin(user.id, form);
      toast.success("Cập nhật người dùng thành công.");
      await reFetchShops();
      router.replace("/shop");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Trạng thái hoạt động</Label>
            <Select value={user.isActive}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Trạng thái hoạt động"
                  className="text-xs"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-xs">Trạng thái Shop</SelectLabel>
                  <SelectItem value="active" className="text-xs">
                    Hoạt động
                  </SelectItem>
                  <SelectItem value="unactive" className="text-xs">
                    Ngừng hoạt động
                  </SelectItem>
                  <SelectItem value="band" className="text-xs">
                    Cấm hoạt động
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Tài khoản</Label>
            <Input type="number" value={user.money || 0} disabled />
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
                src={avatar || user.avatar || "/login.png"}
                fill
                className="lg:w-64 md:w-52 md:h-52 w-40 hover:opacity-90 rounded-full lg:h-64 h-40 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 shadow-lg relative"
              />
              <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="space-x-4">
              <Button onClick={onUploadAvatar}>Thay ảnh</Button>
              {avatar ? (
                <Button
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
                src={background || user.background || "/login.png"}
                fill
                className="lg:w-72 md:w-64 md:h-48 w-52 lg:h-56 h-40 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 rounded-md shadow-lg relative"
              />
              <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="space-x-4">
              <Button onClick={onUploadBackground}>Thay ảnh</Button>
              {background ? (
                <Button
                  variant={"destructive"}
                  onClick={() => handleCancelUpdateImage()}
                >
                  Hủy
                </Button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h1 className="text-lg font-medium">Giới thiệu về Shop</h1>
          <FroalaEditor
            tag="textarea"
            model={description}
            config={{
              imageUploadURL: "/api/upload",
              imageUploadParams: {
                key: "value",
              },
              imageUploadMethod: "POST",
              imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
              imageMaxSize: 10 * 1024 * 1024, // 10MB
              events: {
                "image.beforeUpload": function (images: FileList) {
                  const data = new FormData();
                  data.append("file", images[0]);
                  http
                    .post("/upload-file", data, {
                      token: true,
                    })
                    .then((res: any) => {
                      this?.image?.insert(
                        res.payload.secure_url,
                        null,
                        null,
                        this?.image?.get()
                      );
                    })
                    .catch((err) => {});
                  return false;
                },
              },
            }}
            onModelChange={setDescription}
          />
          <FroalaEditorView model={description} />
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            Cập nhật
          </Button>
          <Link
            href={"/shop"}
            type="submit"
            disabled={isLoading}
            className={cn(buttonVariants({ variant: "destructive" }))}
          >
            Hủy
          </Link>
        </div>
      </form>
      {isLoading ? <Loading /> : null}
    </div>
  );
};

export default FormUpdate;
