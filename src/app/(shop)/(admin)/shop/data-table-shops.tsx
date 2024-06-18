"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  TableOptions,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteShop, updateStatusShop } from "@/utils/actions/shop";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";
import { HttpError } from "@/lib/http";
import { reFetchShops } from "@/utils/server";

export enum StatusShop {
  ACTIVE = "active",
  BAND = "band",
  UNACTIVE = "unactive",
}

export type IShop = {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  money: number;
  avatar: string;
  background: string;
  address: IAddressShop[];
  followers: any[];
  isActive: StatusShop;
  description: string;
};

export type IAddressShop = {
  id: string;
  address: string;
  isAddressDefault: boolean;
  phoneNumber: string;
  userName: string;
};

interface TypeColumnInterface {
  [key: string]: string;
}

export const TypeColumn: TypeColumnInterface = {
  userName: "Tên cửa hàng",
  avatar: "Avatar",
  email: "Email",
  phoneNumber: "Số điện thoại",
  money: "Tổng tiền",
  followers: "Người theo dõi",
  isActive: "Trạng thái Shop",
};

export default function DataShops({
  shops,
  prevPage,
  nextPage,
  lastPage,
  order,
  searchShop,
}: {
  shops: IShop[];
  prevPage: number | null;
  nextPage: number | null;
  lastPage: number;
  order: string;
  searchShop: string;
}) {
  const [search, setSearch] = React.useState<string>("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let page = Number(searchParams.get("page")) || 1;

  const searchDebounce = useDebounce(search, 500);

  const columns: ColumnDef<IShop>[] = [
    {
      accessorKey: "userName",
      header: "Tên cửa hàng",
      cell: ({ row }) => {
        return (
          <div className="capitalize w-28 line-clamp-2">
            {row.getValue("userName")}
          </div>
        );
      },
    },
    {
      accessorKey: "avatar",
      header: "Avatar",
      cell: ({ row }) => {
        const avatar = row.getValue("avatar") as string;
        return (
          <div className="flex items-center justify-center">
            <div className="md:w-24 md:h-24 w-20 hover:opacity-90 rounded-full h-20 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 shadow-lg relative">
              <Image
                alt="avatar user"
                src={avatar || "/login.png"}
                fill
                className="md:w-24 md:h-24 w-20 hover:opacity-90 rounded-full h-20 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 shadow-lg relative"
              />
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phoneNumber",
      header: "Số điện thoại",
      cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    },
    {
      accessorKey: "followers",
      header: "Người theo dõi",
      cell: ({ row }) => {
        const followers = parseInt(row.getValue("followers")) || 0;
        return <div className="text-center">{followers}</div>;
      },
    },
    {
      accessorKey: "isActive",
      header: "Trạng thái Shop",
      cell: ({ row }) => {
        const isActive: string = row.getValue("isActive") || "unactive";
        const shop = row.original;
        return (
          <Select
            defaultValue={isActive}
            onValueChange={(value) => handleUpdateStatusShop(value, shop.id)}
          >
            <SelectTrigger className="w-28 text-xs">
              <SelectValue placeholder="Select a fruit" className="text-xs" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-xs">Trạng thái Shop</SelectLabel>
                <SelectItem value="active" className="text-xs">
                  Hoạt động
                </SelectItem>
                <SelectItem value="unactive" className="text-xs">
                  Ngừng hoạt động
                </SelectItem>
                <SelectItem value="band" className="text-xs">
                  Cấm hoạt động
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      id: "actions",
      header: "Thao tác",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;
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
                onClick={() => navigator.clipboard.writeText(user.id)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                Copy ID người dùng
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/shop/update/${user.id}`)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                Cập nhật người dùng
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteShop(user.id)}
                className="hover:bg-destructive cursor-pointer hover:text-white"
              >
                Xóa người dùng
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const table = useReactTable({
    data: shops,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const handleDeleteShop = async (userId: string) => {
    try {
      await deleteShop(userId);
      await reFetchShops();
      toast.success("Xóa Shop thành công");
    } catch (error: any) {
      if (error instanceof HttpError) {
        toast.error(error.payload.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleUpdateStatusShop = async (value: string, shopId: string) => {
    try {
      await updateStatusShop({ status: value, shopId });
      await reFetchShops();
      toast.success("Cập nhật trạng thái Shop thành công");
    } catch (error) {
      if (error instanceof HttpError) {
        return toast.error(error.payload.message);
      }
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };
  const handleOnSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(e.target.value);
  };

  const handleSetNextPage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (page < lastPage) {
      params.set("page", `${page + 1}`);
      router.replace(`${pathname}?${params.toString()}`);
    }
  };
  const handleSetPrevPage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set("page", `${page - 1}`);
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  const handleSortBy = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    if (sort) {
      params.set("order", sort);
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("search", searchDebounce);
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchDebounce, handleOnSearch]);

  return (
    <div className="w-full bg-background p-4 rounded-md shadow-md space-y-4">
      <h1 className="font-bold text-xl">Quản lý Shop bán hàng</h1>
      <div className="flex md:items-center flex-col md:flex-row py-4 gap-4">
        <Input
          placeholder="Tìm người dùng..."
          defaultValue={searchShop}
          onChange={handleOnSearch}
          className="w-full md:max-w-sm"
        />
        <div className="flex md:justify-end gap-4 w-full">
          <Select
            onValueChange={(value) => handleSortBy(value)}
            defaultValue={order}
          >
            <SelectTrigger className="w-32 text-xs">
              <SelectValue placeholder="Sắp xếp theo" className="text-xs" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <SelectItem
                        value={column.id}
                        key={column.id}
                        className="capitalize"
                      >
                        {TypeColumn[column.id]}
                      </SelectItem>
                    );
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex md:justify-end gap-4 w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {TypeColumn[column.id]}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href={`/shop/create`}
            className={cn([buttonVariants(), "flex items-center gap-2"])}
          >
            <Plus size={18} />
            Thêm người dùng
          </Link>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không tìm thấy người dùng.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Trang {page} trên tổng {lastPage + 1} trang.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSetPrevPage}
            disabled={!prevPage ? true : false}
          >
            Trang trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSetNextPage}
            disabled={!nextPage ? true : false}
          >
            Trang sau
          </Button>
        </div>
      </div>
    </div>
  );
}
