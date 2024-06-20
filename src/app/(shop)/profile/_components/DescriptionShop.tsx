// @ts-nocheck
"use client";

import { toast } from "sonner";
import { useState, useTransition } from "react";
import { Edit } from "lucide-react";
import dynamic from "next/dynamic";

import http, { HttpError } from "@/lib/http";
import { reFetchShop } from "@/utils/server";
import { Button } from "@/components/ui/button";
import { ResponseExceptions } from "@/lib/utils";
import { updateProfileShop } from "@/utils/actions/shop";

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

const DescriptionShop = ({ description }: { description: string }) => {
  const [isPending, startTransition] = useTransition();
  const [isUpdate, setUpdate] = useState<boolean>(false);
  const [updateDescription, setUpdateDescription] =
    useState<string>(description);

  const handleUpdate = async () => {
    startTransition(async () => {
      try {
        await updateProfileShop({ description: updateDescription });
        await reFetchShop();
        toast.success("Cập nhật thông tin thành công");
        setUpdate(false);
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
    <div className="flex flex-col gap-4 py-4">
      <div className="relative flex items-center justify-center">
        <h1 className="text-lg font-medium">Giới thiệu về Shop</h1>
        {!isUpdate ? (
          <Button className="absolute right-4" onClick={() => setUpdate(true)}>
            <Edit size={16} />
          </Button>
        ) : null}
      </div>
      {!isUpdate ? (
        <div dangerouslySetInnerHTML={{ __html: description }} />
      ) : (
        <>
          <FroalaEditor
            tag="textarea"
            model={updateDescription}
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
                    .catch((err) => {});
                  return false;
                },
              },
            }}
            onModelChange={setUpdateDescription}
          />
          <FroalaEditorView model={updateDescription} />
          <div className="flex items-center justify-end gap-4">
            <Button
              disabled={isPending}
              variant={"success"}
              onClick={handleUpdate}
            >
              Cập nhật
            </Button>
            <Button
              variant={"destructive"}
              disabled={isPending}
              onClick={() => setUpdate(false)}
            >
              Hủy
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DescriptionShop;
