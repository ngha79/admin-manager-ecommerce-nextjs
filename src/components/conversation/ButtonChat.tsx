"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import http, { HttpError } from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

const ButtonChat = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const handleSetChat = async () => {
    try {
      const response = await http.get<any>(`/conversation/shop/${userId}`, {
        token: true,
      });
      router.push(`/messages/${response.payload.id}`);
    } catch (error) {
      if (error instanceof HttpError) {
        if (error.status === 404) {
          return router.push(`/messages/new/${userId}`);
        }
      }
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };
  return (
    <Button
      onClick={handleSetChat}
      className="border-destructive gap-2 text-destructive hover:text-destructive/80 bg-destructive/10 hover:bg-destructive/5"
      variant={"outline"}
      size={"sm"}
    >
      <MessageCircle size={18} />
      Chat Ngay
    </Button>
  );
};

export default ButtonChat;
