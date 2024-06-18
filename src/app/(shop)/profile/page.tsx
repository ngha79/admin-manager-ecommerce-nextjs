import React from "react";
import { vi } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";

import { profileShop } from "@/utils/actions/shop";
import DescriptionShop from "./_components/DescriptionShop";
import UpdateAvatarUser from "./_components/UpdateAvatarUser";
import UpdateBackgroundUser from "./_components/UpdateBackgroundUser";

const Page = async () => {
  let profile = null;
  try {
    const response = await profileShop();
    profile = response.payload;
  } catch (error) {
    return null;
  }

  if (!profile) return null;

  return (
    <div className="flex flex-col gap-4 py-8 px-4 flex-1 max-w-7xl mx-auto">
      <div className="relative z-10 bg-background shadow-md rounded-md">
        <div className="w-full relative">
          <UpdateBackgroundUser background={profile?.shop_background} />
          <UpdateAvatarUser avatar={profile?.shop_avatar} />
        </div>
        <div className="pt-20">
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11">
            <h3 className="pb-1.5 mt-4 text-2xl font-medium">
              {profile?.userName}
            </h3>
            <div className="mx-auto mb-5 mt-4 text-sm font-medium grid max-w-96 grid-cols-3 rounded-md border border-slate-300 py-2.5 shadow-md">
              <div className="border-r px-2 line-clamp-1 ">
                {profile?.productCount} Sản phẩm
              </div>
              <div className="border-r px-2 line-clamp-1 ">
                {profile?.followersCount} Followers
              </div>
              <div className="px-2 line-clamp-1 ">
                {profile?.totalCommentCount} Đánh giá
              </div>
            </div>
            <div className="flex items-center justify-center max-w-64 mx-auto gap-6 font-medium">
              <span className="w-20 text-end">Tham Gia:</span>
              <span className="text-destructive">
                {formatDistanceToNow(new Date(profile?.shop_createdAt), {
                  addSuffix: true,
                  locale: vi,
                })}
              </span>
            </div>
            <DescriptionShop description={profile?.shop_description} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
