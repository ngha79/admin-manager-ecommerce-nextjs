"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IResponsePagination } from "@/utils/types/response-pagination";

const PaginationInventory = ({ page }: { page: IResponsePagination }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSetPage = (page: number | null) => {
    if (!page) return null;
    const params = new URLSearchParams(searchParams);
    if (page > 0) {
      params.set("page", `${page}`);
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant={"ghost"}
            disabled={page.prevPage ? false : true}
            onClick={() => handleSetPage(page.prevPage)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Trước</span>
          </Button>
        </PaginationItem>
        <PaginationItem>
          {page.prevPage ? (
            <Button
              variant={"ghost"}
              onClick={() => handleSetPage(page.prevPage)}
            >
              {page.prevPage}
            </Button>
          ) : null}
        </PaginationItem>
        <PaginationItem>
          <Button variant={"outline"}>{searchParams.get("page") || 1}</Button>
        </PaginationItem>
        <PaginationItem>
          {page.nextPage ? (
            <Button
              variant={"ghost"}
              onClick={() => handleSetPage(page.nextPage)}
            >
              {page.nextPage}
            </Button>
          ) : null}
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <Button
            variant={"ghost"}
            disabled={page.nextPage ? false : true}
            onClick={() => handleSetPage(page.nextPage)}
          >
            <span>Sau</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationInventory;
