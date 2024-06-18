"use client";

import { Edit } from "lucide-react";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { HttpError } from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateTopic } from "@/utils/actions/blog";
import { reFetchTag } from "@/utils/server";

const UpdateTopic = ({ topic }: { topic: any }) => {
  const [newName, setNewName] = useState<string>("");
  const onUpdate = async () => {
    try {
      await updateTopic(topic.id, { topic: newName });
      await reFetchTag("topics");
      toast.success("Cập nhật chủ đề thành công thành công.");
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.payload.message);
      } else {
        toast.error(ResponseExceptions.DEFAULT_ERROR);
      }
    }
  };

  const handleOnChange = (e: any) => {
    setNewName(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 group-hover:bg-green-500 group-hover:block hidden group-hover:text-white rounded-md">
          <Edit size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật chủ đề</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label>Chủ đề</Label>
          <Input defaultValue={topic.topic} onChange={handleOnChange} />
        </div>
        <DialogFooter>
          <DialogTrigger>
            <Button type="button" onClick={onUpdate}>
              Cập nhật
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTopic;
