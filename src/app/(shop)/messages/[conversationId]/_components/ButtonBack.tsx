"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ButtonBack = () => {
  const router = useRouter();
  return (
    <Button variant={"ghost"} onClick={() => router.push("/messages")}>
      <MoveLeft />
    </Button>
  );
};

export default ButtonBack;
