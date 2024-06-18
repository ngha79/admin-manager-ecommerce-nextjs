// @ts-nocheck
"use client";

import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import http, { HttpError } from "@/lib/http";
import { cn, ResponseExceptions } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { createBlog, getListTopicBlog } from "@/utils/actions/blog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reFetchBlog } from "@/utils/server";

const blogValidator = z.object({
  title: z
    .string()
    .min(10, { message: "Tiêu đề bài viết quán ngắn." })
    .max(100, { message: "Tiêu đề bài viết quá dài." }),
  author: z
    .string()
    .min(2, { message: "Tên tác giả quá ngắn." })
    .max(100, { message: "Tên tác giả quá dài." }),
  topic: z.number({ required_error: "Bạn chưa chọn chủ đề bài viết." }),
});

type TBlogValidator = z.infer<typeof blogValidator>;

const FroalaEditor = dynamic(
  () => {
    return Promise.all([
      import("react-froala-wysiwyg"),
      import("froala-editor/css/froala_editor.pkgd.min.css"),
      import("froala-editor/css/froala_style.min.css"),
      import("froala-editor/js/plugins/image.min.js"),
      import("froala-editor/js/plugins.pkgd.min.js"),
    ]).then(([module]) => module);
  },
  {
    ssr: false,
  }
);

const FroalaEditorView = dynamic(
  () => {
    return Promise.all([
      import("react-froala-wysiwyg/FroalaEditorView"),
      import("froala-editor/css/froala_editor.pkgd.min.css"),
      import("froala-editor/css/froala_style.min.css"),
      import("froala-editor/js/plugins/image.min.js"),
      import("froala-editor/js/plugins.pkgd.min.js"),
    ]).then(([module]) => module);
  },
  {
    ssr: false,
  }
);

const Page = () => {
  const [content, setContent] = useState("");
  const [isLoading, startTransition] = useTransition();
  const [listTopic, setListTopic] = useState<any[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<TBlogValidator>({
    resolver: zodResolver(blogValidator),
  });
  const router = useRouter();

  const onSubmit = async (data: TBlogValidator) => {
    startTransition(async () => {
      try {
        await createBlog({ ...data, description: content });
        await reFetchBlog();
        toast.success("Tạo bài viết thành công.");
        router.replace("/blog");
      } catch (error) {
        if (error instanceof HttpError) {
          toast.error(error.payload.message);
        } else {
          toast.error(ResponseExceptions.DEFAULT_ERROR);
        }
      }
    });
  };

  useEffect(() => {
    async function getListTopic() {
      try {
        const response = await getListTopicBlog();
        setListTopic(response.payload);
      } catch (error) {
        setListTopic([]);
      }
    }
    getListTopic();
  }, []);

  const handleSetTopic = (value: string) => {
    const getIdTopic = listTopic.find((item) => item.topic === value);
    setValue("topic", getIdTopic.id);
    trigger("topic");
  };

  return (
    <div className="container py-4 space-y-4">
      <h1 className="text-lg font-medium">Thêm bài viết mới</h1>
      <form action="" className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label>Tiêu đề</Label>
          <Input
            disabled={isLoading}
            {...register("title")}
            className={cn({
              "focus-visible:ring-red-500": errors.title,
            })}
          />
          {errors?.title && (
            <p className="text-sm text-red-500">{errors?.title.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Tên tác giả</Label>
          <Input
            disabled={isLoading}
            {...register("author")}
            className={cn({
              "focus-visible:ring-red-500": errors.author,
            })}
          />
          {errors?.author && (
            <p className="text-sm text-red-500">{errors?.author.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Chủ đề</Label>
          <Select
            onValueChange={(value) => handleSetTopic(value)}
            defaultValue={listTopic?.[0]?.topic}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chủ đề" color={"text-destructive"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {listTopic?.map((topic) => (
                  <SelectItem value={topic.topic} key={topic.id}>
                    {topic.topic}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors?.topic && (
            <p className="text-sm text-red-500">{errors?.topic.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Nội dung bài viết</Label>
          <div className="editor-container pt-5 mx-auto max-w-4xl">
            <div className="editor-title-input">
              <FroalaEditor
                tag="textarea"
                config={{
                  imageUploadURL: "/api/upload",
                  imageUploadParams: {
                    key: "value",
                  },
                  imageUploadMethod: "POST",
                  imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
                  imageMaxSize: 10 * 1024 * 1024, // 10MB
                  events: {
                    "image.beforeUpload": function (images: FileList) {
                      const data = new FormData();
                      data.append("file", images[0]);
                      http
                        .post("/upload-file", data, {
                          token: true,
                        })
                        .then((res: any) => {
                          this?.image?.insert(
                            res.payload.secure_url,
                            null,
                            null,
                            this?.image?.get()
                          );
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                      return false;
                    },
                  },
                }}
                onModelChange={setContent}
              />
              <FroalaEditorView model={content} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 justify-end">
          <Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
            Tạo bài viết
          </Button>
          <Link
            href={"/blog"}
            className={cn(buttonVariants({ variant: "destructive" }))}
          >
            Hủy
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Page;
