"use client";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { ResponseExceptions } from "@/lib/utils";
import { updateAvatarShop } from "@/utils/actions/shop";
import { reFetchShop } from "@/utils/server";
import { Camera, Check, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const UpdateAvatarUser = ({ avatar }: { avatar: string }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [fileAvatar, setFileAvatar] = useState<File | null>(null);
  const [imageAvatar, setImageAvatar] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const target = () => {
    ref.current?.click();
  };

  const handleSetFileAvatar = (e: React.FormEvent<HTMLInputElement>) => {
    const files = ref.current?.files;

    if (files) {
      const image = URL.createObjectURL(files[0]);
      setImageAvatar(image);
      setFileAvatar(files[0]);
    }
  };

  const handleCancelAvatar = () => {
    setImageAvatar("");
    setFileAvatar(null);
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
  return (
    <>
      {isPending ? <Loading /> : null}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full backdrop-blur p-3">
        <div className="w-32 h-32 md:w-40 md:h-40 relative shadow-lg rounded-full overflow-hidden border cursor-pointer bg-background flex items-center justify-center">
          <Image
            alt="avatar"
            src={imageAvatar || avatar || "/login.png"}
            fill
          />
        </div>
        <input
          type="file"
          name=""
          className="hidden"
          ref={ref}
          onChange={handleSetFileAvatar}
          id=""
        />
        <div className="absolute bottom-4 z-20 right-1/2 translate-x-1/2 cursor-pointer">
          {!fileAvatar ? (
            <Button onClick={target} size={"sm"}>
              <Camera size={16} />
            </Button>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleCancelAvatar}
                  disabled={isPending}
                  variant={"destructive"}
                  size={"sm"}
                >
                  <X size={16} />
                </Button>
                <Button
                  onClick={handleUpdateAvatar}
                  disabled={isPending}
                  variant={"success"}
                  size={"sm"}
                >
                  <Check size={16} />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateAvatarUser;
