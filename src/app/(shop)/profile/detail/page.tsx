import React from "react";
import UpdateProfile from "./UpdateProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChangePassword from "./ChangePassword";

const Page = () => {
  return (
    <div className="container py-4">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Tài khoản</TabsTrigger>
          <TabsTrigger value="password">Mật khẩu</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <UpdateProfile />
        </TabsContent>
        <TabsContent value="password">
          <ChangePassword />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
