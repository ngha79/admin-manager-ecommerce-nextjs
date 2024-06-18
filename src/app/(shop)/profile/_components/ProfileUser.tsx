"use client";

import { Button } from "@/components/ui/button";
import { ResponseExceptions } from "@/lib/utils";
import { updateAvatarShop, updateBackgroundShop } from "@/utils/actions/shop";
import { reFetchShop } from "@/utils/server";
import { format } from "date-fns";
import { UserRoundCheck, Users } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

interface IProfileUser {
  avatar: string;
  background: string;
  userName: string;
  phoneNumber: string;
  email: string;
  followers: any[];
  createdAt: Date;
}

const ProfileUser = ({
  avatar,
  background,
  userName,
  email,
  followers,
  createdAt,
}: IProfileUser) => {
  const [isPending, startTransition] = useTransition();
  const [fileAvatar, setFileAvatar] = useState<File | null>(null);
  const [imageAvatar, setImageAvatar] = useState<string>("");
  const [imageBackground, setImageBackground] = useState<string>("");
  const [fileBackground, setFileBackground] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const refBackground = useRef<HTMLInputElement>(null);

  const target = () => {
    ref.current?.click();
  };

  const targetBackground = () => {
    refBackground.current?.click();
  };

  const handleSetFileAvatar = (e: React.FormEvent<HTMLInputElement>) => {
    const files = ref.current?.files;

    if (files) {
      const image = URL.createObjectURL(files[0]);
      setImageAvatar(image);
      setFileAvatar(files[0]);
    }
  };

  const handleSetFileBackground = (e: React.FormEvent<HTMLInputElement>) => {
    const files = refBackground.current?.files;
    if (files) {
      const image = URL.createObjectURL(files[0]);
      setImageBackground(image);
      setFileBackground(files[0]);
    }
  };

  const handleCancelAvatar = () => {
    setImageAvatar("");
    setFileAvatar(null);
  };

  const handleCancelBackground = () => {
    setImageBackground("");
    setFileBackground(null);
  };

  const handleUpdateAvatar = async () => {
    const form = new FormData();
    if (!fileAvatar) return;
    form.append("file", fileAvatar);
    setImageAvatar("");
    setFileAvatar(null);
    startTransition(async () => {
      try {
        await updateAvatarShop(form);
        await reFetchShop();
        toast.success("Cập nhật Avatar thành công.");
      } catch (error) {
        toast.error(ResponseExceptions.DEFAULT_ERROR);
      }
    });
  };

  const handleUpdateBackground = async () => {
    const form = new FormData();
    if (!fileBackground) return;
    form.append("file", fileBackground);
    setImageAvatar("");
    setFileBackground(null);
    startTransition(async () => {
      try {
        await updateBackgroundShop(form);
        await reFetchShop();
        toast.success("Cập nhật Background thành công.");
      } catch (error) {
        toast.error(ResponseExceptions.DEFAULT_ERROR);
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center rounded-md justify-center w-full md:max-w-sm bg-background py-12 px-4">
      <div className="w-full h-40 relative flex items-center justify-center border rounded-md shadow-md">
        <Image
          alt="background"
          src={imageBackground || background || "/login.png"}
          fill
          className="absolute top-0 left-0 z-0"
        />
        <div className="w-20 h-20 z-10 relative bg-red-200 shadow-lg rounded-full overflow-hidden border cursor-pointer flex items-center justify-center">
          <Image
            alt="avatar"
            src={imageAvatar || avatar || "/login.png"}
            fill
          />
        </div>
      </div>
      <input
        type="file"
        name=""
        className="hidden"
        ref={ref}
        onChange={handleSetFileAvatar}
        id=""
      />
      <input
        type="file"
        name=""
        className="hidden"
        ref={refBackground}
        onChange={handleSetFileBackground}
        id=""
      />
      <div className="flex items-center gap-4">
        {!fileAvatar ? (
          <Button onClick={target} disabled={isPending}>
            Thay đổi Avatar
          </Button>
        ) : (
          <>
            <Button
              onClick={handleCancelAvatar}
              disabled={isPending}
              variant={"destructive"}
            >
              Hủy
            </Button>
            <Button
              onClick={handleUpdateAvatar}
              disabled={isPending}
              variant={"success"}
            >
              Cập nhật
            </Button>
          </>
        )}
        {!fileBackground ? (
          <Button onClick={targetBackground} disabled={isPending}>
            Thay đổi Background
          </Button>
        ) : (
          <>
            <Button
              onClick={handleCancelBackground}
              disabled={isPending}
              variant={"destructive"}
            >
              Hủy
            </Button>
            <Button
              onClick={handleUpdateBackground}
              disabled={isPending}
              variant={"success"}
            >
              Cập nhật
            </Button>
          </>
        )}
      </div>
      <span className="text-lg font-bold">{userName}</span>
      <span className="text-gray-800 flex items-center gap-2 font-medium">
        <Users size={18} /> Theo dõi:{" "}
        <span className="text-destructive">{followers?.length}</span>
      </span>
      <span className="text-gray-800 flex items-center gap-2 font-medium">
        <UserRoundCheck size={18} />
        <span className="line-clamp-1 w-max ">Đã tham gia:</span>
        <span className="text-destructive line-clamp-1 w-max">
          {format(createdAt, "dd-MM-yyyy")}
        </span>
      </span>
    </div>
  );
};

export default ProfileUser;
