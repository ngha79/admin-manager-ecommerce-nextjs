"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Error = ({ error, reset }: { error?: Error; reset?: () => void }) => {
  return (
    <div className="w-full">
      <div className="min-h-[500px] flex text-destructive font-medium text-lg flex-col items-center justify-center gap-y-4">
        Có lỗi xảy ra vui lòng thử lại sau.
        <Link
          href={"/"}
          className={cn(buttonVariants({ variant: "destructive" }))}
        >
          Quay lại
        </Link>
      </div>
    </div>
  );
};

export default Error;
