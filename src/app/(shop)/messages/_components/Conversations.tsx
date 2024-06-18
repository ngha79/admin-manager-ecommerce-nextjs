"use client";

import { Label } from "@/components/ui/label";
import { cn, ResponseExceptions } from "@/lib/utils";
import { MoveLeft, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import http from "@/lib/http";
import { IResponsePagination } from "@/utils/types/response-pagination";
import useDebounce from "@/hooks/useDebounce";
import { toast } from "sonner";
import Conversation from "./Conversation";

const Conversations = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const [isSearch, setSearch] = useState(false);
  const [conversationSearchs, setConversationSearchs] = useState<any[]>([]);
  const [conversationSearch, setConversationSearch] = useState("");
  const ref = useRef<any>();
  const handleSetSearch = () => {
    if (isSearch) {
      setSearch(!isSearch);
      setConversationSearch("");
    }
  };

  const handleOnChange = async (e: any) => {
    setConversationSearch(e.target.value);
  };

  const search = useDebounce(conversationSearch, 500);

  useEffect(() => {
    async function searchConversation() {
      try {
        const response = await http.get<IResponsePagination>(
          `/conversation?page=1&limit=20&search=${search}`,
          {
            token: true,
            cache: "no-store",
          }
        );
        setConversationSearchs(response.payload.data);
      } catch (error) {
        toast.error(ResponseExceptions.DEFAULT_ERROR);
      }
    }
    if (search) {
      searchConversation();
    }
  }, [search]);
  useOnClickOutside(ref, handleSetSearch);
  return (
    <div
      className={cn(
        "w-full md:w-80 h-full bg-background border-r lg:border-l p-4 flex flex-col gap-4",
        pathName !== "/messages" ? "md:flex hidden" : ""
      )}
    >
      <h1 className="font-semibold text-2xl">Đoạn chat</h1>
      <div className="relative h-full w-full space-y-8" ref={ref}>
        <div className="flex gap-2 w-full items-center h-10">
          {isSearch ? (
            <Button variant={"ghost"} onClick={() => setSearch(false)}>
              <MoveLeft className="w-4 h-4 text-gray-700" />
            </Button>
          ) : null}
          <div className="flex items-center gap-1 w-full border bg-gray-200 pl-2 rounded-lg">
            <Label>
              <Search className="w-5 h-5 text-gray-700" />
            </Label>
            <input
              placeholder="Tìm kiếm cuộc trò chuyện"
              onFocus={() => setSearch(true)}
              onChange={(e) => handleOnChange(e)}
              value={conversationSearch}
              className="border-none outline-none text-gray-700 text-sm rounded-lg p-2 bg-transparent"
            />
          </div>
        </div>
        <div className="relative h-full w-full">
          <div className="flex flex-col h-full w-full overflow-y-scroll scrollbar-hide absolute top-0 z-0">
            {children}
          </div>
          {isSearch ? (
            <div className="flex flex-col h-full w-full bg-background overflow-y-scroll scrollbar-hide absolute top-0 z-10">
              {conversationSearchs?.map((conver) => (
                <Conversation conversation={conver} key={conver.id} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Conversations;
