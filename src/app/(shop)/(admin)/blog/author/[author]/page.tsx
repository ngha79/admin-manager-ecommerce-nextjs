import React from "react";
import ListBlog from "../../_component/ListBlog";

const Page = async ({
  params,
  searchParams,
}: {
  params: { author: string };
  searchParams: { page: string };
}) => {
  return (
    <div className="container py-8 space-y-8">
      <h1 className="font-bold text-3xl">
        <span>Author: {params.author}</span>
      </h1>
      <ListBlog searchParams={searchParams} params={params} />
    </div>
  );
};

export default Page;
