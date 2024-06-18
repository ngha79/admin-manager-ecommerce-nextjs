"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  brand: string;
  sold: number;
  price: number;
  isPublish: boolean;
  picture: ProductImage[];
};

export type ProductImage = {
  id: string;
  image_id: string;
  product_thumb: string;
  product_image_url: string;
};

export type Iventory = {
  id: string;
  image_id: string;
  product_thumb: string;
  product_image_url: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <div className="capitalize">{row.getValue("name")}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "brand",
    header: "Danh mục",
    cell: ({ row }) => <div>{row.getValue("brand")}</div>,
  },
  {
    accessorKey: "price",
    header: "Giá sản phẩm",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "sold",
    header: "Đã bán",
    cell: ({ row }) => {
      const sold = Number(row.getValue("sold")) || 1;
      return <div className="text-center">{sold}</div>;
    },
  },
  {
    accessorKey: "isPublish",
    header: "Trạng thái",
    cell: ({ row }) => {
      const sold = row.getValue("isPublish") ? "publish" : "unpublish";
      return (
        <Select defaultValue={"publish"}>
          <SelectTrigger className="w-28 text-xs">
            <SelectValue placeholder="Select a fruit" className="text-xs" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-xs">Trạng thái sản phẩm</SelectLabel>
              <SelectItem value="publish" className="text-xs">
                Active
              </SelectItem>
              <SelectItem value="unpublsh" className="text-xs">
                UnActive
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
              className="hover:bg-gray-100 cursor-pointer"
            >
              Copy mã sản phẩm
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
              Cập nhật sản phẩm
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-destructive cursor-pointer hover:text-white">
              Xóa sản phẩm
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
