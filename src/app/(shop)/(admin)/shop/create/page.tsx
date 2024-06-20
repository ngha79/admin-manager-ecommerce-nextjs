// @ts-nocheck
"use client";
import { z } from "zod";
import { toast } from "sonner";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusShop } from "../data-table-shops";
import { createShop } from "@/utils/actions/shop";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import http, { HttpError } from "@/lib/http";
import { reFetchShops } from "@/utils/server";

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

interface IShop {
  userName: string;
  email: string;
  avatar: File;
  background: File;
  phoneNumber: string;
  password: string;
  description: string;
  isActive: StatusShop;
  address: [
    {
      address: string;
      userName: string;
      phoneNumber: string;
    }
  ];
}

const userValidator = z.object({
  userName: z.string().min(4, { message: "Tên người dùng tối thiểu 4 ký tự." }),
  email: z.string().email({
    message: "Email không đúng định dạng.",
  }),
  password: z.string().min(6, { message: "Mật khẩu tối thiểu 6 ký tự." }),
  phoneNumber: z
    .string()
    .length(10, { message: "Số điện thoại không đúng định dạng." }),
});

type TUserValidator = z.infer<typeof userValidator>;

const Page = () => {
  const [isLoading, startTransition] = useTransition();
  const [isActive, setIsActive] = useState<string>("unactive");
  const [avatar, setAvatar] = useState<string>("");
  const [background, setBackground] = useState<string>("");
  const [fileAvatar, setFileAvatar] = useState<any>(null);
  const [fileBackground, setFileBackground] = useState<any>(null);
  const [errorAvatar, setErrorAvatar] = useState<string>("");
  const [errorBackground, setErrorBackground] = useState<string>("");
  const avatarUser = useRef<HTMLInputElement>(null);
  const backgroundUser = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState<string>("");

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
      setErrorAvatar("");
    }
  };
  const handleUploadBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = URL.createObjectURL(e.target.files[0]);
      setBackground(image);
      setFileBackground(e.target.files[0]);
      setErrorBackground("");
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

  const onSubmit = async ({
    email,
    password,
    phoneNumber,
    userName,
  }: TUserValidator) => {
    const form = new FormData();
    form.append("userName", userName);
    form.append("password", password);
    form.append("phoneNumber", phoneNumber);
    form.append("email", email);
    form.append("fileAvatar", fileAvatar);
    form.append("fileBackground", fileBackground);
    form.append("isActive", isActive);
    form.append("description", description);
    startTransition(async () => {
      try {
        await createShop(form);
        await reFetchShops();
        toast.success("Thêm người dùng thành công.");
        router.push("/shop");
      } catch (error) {
        if (error instanceof HttpError) {
          toast.error(error.payload.message);
        } else {
          toast.error("Không thể đăng ký, vui lòng thử lại sau.");
        }
      }
    });
  };

  return (
    <div className="p-4 flex flex-col max-w-7xl w-full mx-auto gap-4">
      <h1 className="text-lg text-gray-700 font-bold">Tạo Shop mới</h1>
      <form onSubmit={handleSubmit(onSubmit)}></form>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="****@gmail.com"
            {...register("email")}
            className={cn({
              "focus-visible:ring-red-500": errors.email,
            })}
          />
          {errors?.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
          <Label htmlFor="userName">Tên Shop</Label>
          <Input
            placeholder="Nguyễn Văn A"
            {...register("userName")}
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
          <Input
            type="password"
            {...register("password")}
            className={cn({
              "focus-visible:ring-red-500": errors.password,
            })}
          />
          {errors?.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
          <Label htmlFor="phoneNumber">Số điện thoại</Label>
          <Input
            placeholder="0123456789"
            {...register("phoneNumber")}
            className={cn({
              "focus-visible:ring-red-500": errors.phoneNumber,
            })}
          />
          {errors?.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Trạng thái hoạt động</Label>
          <Select
            defaultValue={isActive}
            onValueChange={(value) => setIsActive(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" className="text-xs" />
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
              </SelectGroup>
            </SelectContent>
          </Select>
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
        <div className="flex flex-wrap gap-2">
          <div
            className="lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 rounded-md shadow-lg relative"
            onClick={onUploadAvatar}
          >
            <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          {avatar ? (
            <div className="relative lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 border rounded-md overflow-hidden">
              <Image alt="thumb" src={avatar} fill />
            </div>
          ) : null}
        </div>
        {errorAvatar && <p className="text-sm text-red-500">{errorAvatar}</p>}
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="thumb">Background</Label>
        <Input
          type="file"
          className="hidden"
          ref={backgroundUser}
          onChange={handleUploadBackground}
        />
        <div className="flex flex-wrap gap-2">
          <div
            className="lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 rounded-md shadow-lg relative"
            onClick={onUploadBackground}
          >
            <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          {background ? (
            <div className="relative lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 border rounded-md overflow-hidden">
              <Image alt="thumb" src={background} fill />
            </div>
          ) : null}
        </div>
        {errorBackground && (
          <p className="text-sm text-red-500">{errorBackground}</p>
        )}
      </div>
      <div className="flex flex-col gap-4 py-4">
        <h1 className="text-lg font-medium">Giới thiệu về Shop</h1>
        <FroalaEditor
          tag="textarea"
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
      <Button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        {isLoading ? <Loading /> : null}
        Thêm người dùng
      </Button>
    </div>
  );
};

export default Page;
