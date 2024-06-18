import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import ShopReport from "./ShopReport";

const ListShopReports = () => {
  return (
    <TabsContent value="shop">
      <ShopReport />
    </TabsContent>
  );
};

export default ListShopReports;
