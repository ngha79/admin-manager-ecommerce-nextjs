"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";
import UpdateInventory from "./UpdateInventory";

const Inventory = ({ inventory }: { inventory: any }) => {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={inventory.productAttribute.picture}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{inventory.product.name}</TableCell>
      <TableCell>
        <Badge variant="outline">
          {inventory.product.isPublish ? "Active" : "Draft"}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {inventory.product.price}
      </TableCell>
      <TableCell>{inventory.stock}</TableCell>
      <TableCell className="hidden md:table-cell text-center">
        {inventory.product.sold}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {format(inventory.productAttribute.createdAt, "yyyy/MM/dd h:mm")}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="space-y-2">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <UpdateInventory inventory={inventory} />
            <Button
              variant={"ghost"}
              className="w-full hover:bg-red-500 hover:text-white"
            >
              Xóa
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default Inventory;
