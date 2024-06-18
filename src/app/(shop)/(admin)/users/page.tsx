import { getListUsers } from "@/utils/actions/user";
import React from "react";
import DataUsers from "./data-table-users";

const Page = async ({
  searchParams: { page, limit, search },
}: {
  searchParams: { page: number; limit: number; search: string };
}) => {
  let users = null;
  try {
    users = await getListUsers({
      page,
      limit,
      search,
    });
  } catch (error) {
    throw new Error();
  }
  const { data, lastPage, nextPage, prevPage } = users.payload;
  return (
    <div className="max-w-7xl mx-auto w-full p-4 flex flex-col gap-4">
      <h1 className="font-bold text-lg">Quản lý người dùng</h1>
      <DataUsers
        users={data}
        lastPage={lastPage}
        nextPage={nextPage}
        prevPage={prevPage}
        searchUser={search}
      />
    </div>
  );
};

export default Page;
