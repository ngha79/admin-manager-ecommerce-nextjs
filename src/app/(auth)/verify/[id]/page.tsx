"use client";

import http from "@/lib/http";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  useEffect(() => {
    async function verifyUser() {
      try {
        await http.get(`/auth/verify-shop/${params.id}`, {});
        router.push("/");
      } catch (error) {
        router.push("/");
      }
    }
    if (params.id) {
      verifyUser();
    }
  }, [params.id, router]);
  return null;
};

export default Page;
