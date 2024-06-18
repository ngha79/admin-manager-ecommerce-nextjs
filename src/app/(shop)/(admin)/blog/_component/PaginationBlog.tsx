"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Pagination = ({
  listPage,
  searchParams,
}: {
  listPage: any;
  searchParams: { page: string };
}) => {
  const { lastPage, nextPage, prevPage, curPage } = listPage;
  const { page } = searchParams;
  const router = useRouter();
  const pathname = usePathname();
  const handleFetchPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${page}`);
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div
      className={cn([
        "flex-1 items-center justify-center gap-2",
        lastPage ? "flex" : "hidden",
      ])}
    >
      <Button
        className="md:hidden"
        disabled={prevPage !== null ? false : true}
        onClick={() => handleFetchPage(prevPage)}
      >
        Trước
      </Button>
      {Number(curPage) > 4 ? (
        <>
          <Button variant={"ghost"}>...</Button>
          <Button
            onClick={() => handleFetchPage(0)}
            className="hidden md:block"
          >
            1
          </Button>
        </>
      ) : null}
      {prevPage !== null ? (
        <Button
          variant={"outline"}
          className="hidden md:block"
          onClick={() => handleFetchPage(prevPage)}
        >
          {prevPage}
        </Button>
      ) : null}
      <Button className="hidden md:block">{curPage}</Button>
      {nextPage ? (
        <Button
          variant={"outline"}
          onClick={() => handleFetchPage(nextPage)}
          className="hidden md:block"
        >
          {nextPage}
        </Button>
      ) : null}
      {lastPage && lastPage > page + 4 ? (
        <>
          <Button variant={"ghost"}>...</Button>
          <Button
            onClick={() => handleFetchPage(lastPage)}
            className="hidden md:block"
          >
            {lastPage}
          </Button>
        </>
      ) : null}
      <Button
        className="md:hidden"
        onClick={() => handleFetchPage(nextPage)}
        disabled={nextPage ? false : true}
      >
        Sau
      </Button>
    </div>
  );
};

export default Pagination;
