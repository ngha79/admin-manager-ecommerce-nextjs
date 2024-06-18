import http from "@/lib/http";

export default function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        loader.file.then(async (file) => {
          const body = new FormData();
          body.append("file", file);
          http
            .post("/upload-file", body)
            .then((file) => {
              resolve({ default: file.payload.secure_url });
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
    },
  };
}
