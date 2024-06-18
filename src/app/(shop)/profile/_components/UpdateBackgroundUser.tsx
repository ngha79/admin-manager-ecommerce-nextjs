"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Camera, Pen } from "lucide-react";
import Image from "next/image";

import { ResponseExceptions } from "@/lib/utils";
import { updateBackgroundShop } from "@/utils/actions/shop";
import { reFetchShop } from "@/utils/server";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import Link from "next/link";

const UpdateBackgroundUser = ({ background }: { background: string }) => {
  const refBackground = useRef<HTMLInputElement>(null);
  const [imageBackground, setImageBackground] = useState<string>("");
  const [fileBackground, setFileBackground] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const targetBackground = () => {
    refBackground.current?.click();
  };

  const handleSetFileBackground = (e: React.FormEvent<HTMLInputElement>) => {
    const files = refBackground.current?.files;
    if (files) {
      const image = URL.createObjectURL(files[0]);
      setImageBackground(image);
      setFileBackground(files[0]);
    }
  };
  const handleCancelBackground = () => {
    setImageBackground("");
    setFileBackground(null);
  };
  const handleUpdateBackground = async () => {
    const form = new FormData();
    if (!fileBackground) return;
    form.append("file", fileBackground);
    setImageBackground("");
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
    <div className="relative">
      {isPending ? <Loading /> : null}
      <AspectRatio ratio={16 / 6} className="bg-background rounded-md">
        <Image
          src={imageBackground || background || "/login.png"}
          alt="Image"
          fill
          className="rounded-md object-cover"
        />
        <input
          type="file"
          name=""
          className="hidden"
          ref={refBackground}
          onChange={handleSetFileBackground}
          id=""
        />
      </AspectRatio>
      <div className="absolute top-2 right-4 md:right-8 space-x-2 flex items-center gap-2">
        <div className="space-x-4">
          {!fileBackground ? (
            <Button
              onClick={targetBackground}
              className="gap-1"
              disabled={isPending}
            >
              <Camera size={16} />
              Sửa
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
        <div className="flex">
          <Link href={"/profile/detail"}>
            <Button className="gap-1">
              <Pen size={16} /> Thay đổi thông tin cá nhân
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateBackgroundUser;
