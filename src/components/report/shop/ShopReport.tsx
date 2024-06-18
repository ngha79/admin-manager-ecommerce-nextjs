import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import OptionReport from "../OptionReport";

const ShopReport = () => {
  return (
    <div className="w-full flex relative items-start gap-2 p-4 rounded-md bg-background shadow-md border">
      <Image
        alt="avatar"
        src={"/login.png"}
        width={60}
        height={60}
        className="rounded-full border"
      />
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">ShopReport</span>
          <span className="text-sm text-gray-600">
            {format(new Date(), "dd/MM/yyyy h:mm")}
          </span>
        </div>
        <span className="line-clamp-3 w-4/5 truncate">ShopReport</span>
        <div className="flex items-center gap-4 mt-2 border w-full py-2 px-4 rounded-md shadow-md">
          <Image
            alt="avatar"
            src={"/login.png"}
            width={60}
            height={60}
            className="rounded-full border"
          />
          <div className="space-y-2">
            <h1 className="font-medium">ShopReport</h1>
            <div className="flex items-center gap-2">
              <Button>Xem Shop</Button>
              <Button variant={"destructive"}>Cấm hoạt động</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <OptionReport />
      </div>
    </div>
  );
};

export default ShopReport;
