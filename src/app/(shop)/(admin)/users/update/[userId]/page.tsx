import React from "react";
import FormUpdate from "./FormUpdate";
import { getProfileUser } from "@/utils/actions/user";

const Page = async ({ params }: { params: { userId: string } }) => {
  let user = null;
  try {
    user = await getProfileUser(params.userId);
  } catch (error) {
    throw new Error();
  }
  return <FormUpdate user={user.payload} />;
};

export default Page;
