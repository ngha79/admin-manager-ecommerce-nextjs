"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import React, { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HttpError } from "@/lib/http";
import { cn, ResponseExceptions } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTopic } from "@/utils/actions/blog";
import { reFetchTag } from "@/utils/server";

const subjectValidator = z.object({
  topic: z
    .string()
    .min(1, { message: "Bạn chưa thêm nội dung." })
    .max(100, { message: "Tiêu đề bài viết quá dài." }),
});

type TTopicValidator = z.infer<typeof subjectValidator>;

const CreateTopic = () => {
  const [isLoading, startTransition] = useTransition();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TTopicValidator>({
    resolver: zodResolver(subjectValidator),
  });
  const onSubmit = async (data: TTopicValidator) => {
    startTransition(async () => {
      try {
        await createTopic(data);
        await reFetchTag("topics");
        reset();
        toast.success("Tạo chủ đề mới thành công thành công.");
      } catch (error) {
        if (error instanceof HttpError) {
          toast.error(error.payload.message);
        } else {
          toast.error(ResponseExceptions.DEFAULT_ERROR);
        }
      }
    });
  };
  return (
    <form className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label className="text-base">Thêm chủ đề mới</Label>
        <Input
          disabled={isLoading}
          {...register("topic")}
          className={cn({
            "focus-visible:ring-red-500": errors.topic,
          })}
        />
        {errors?.topic && (
          <p className="text-sm text-red-500">{errors?.topic.message}</p>
        )}
      </div>
      <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
        Thêm
      </Button>
    </form>
  );
};

export default CreateTopic;
