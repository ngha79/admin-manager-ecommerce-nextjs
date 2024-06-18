"use client";

import * as React from "react";
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal, Plus } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { deleteUser } from "@/utils/actions/user";
import Link from "next/link";
import { cn, ResponseExceptions } from "@/lib/utils";
import { HttpError } from "@/lib/http";
import useDebounce from "@/hooks/useDebounce";

export type IUser = {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  payment: number;
  avatar: string;
  background: string;
  address: IAddressUser[];
  following: any[];
};

export type IAddressUser = {
  id: string;
  address: string;
  isAddressDefault: boolean;
  phoneNumber: string;
  userName: string;
};

interface TypeColumnInterface {
  userName: string;
  avatar: string;
  email: string;
  phoneNumber: string;
  following: string;

  [key: string]: string;
}

export const TypeColumn: TypeColumnInterface = {
  userName: "Tên người dùng",
  avatar: "Avatar",
  email: "Email",
  phoneNumber: "Số điện thoại",
  following: "Đang theo dõi",
};

function getValue(key: string): string | undefined {
  return TypeColumn[key];
}

export default function DataUsers({
  users,
  prevPage,
  nextPage,
  lastPage,
  searchUser,
}: {
  users: IUser[];
  prevPage: number | null;
  nextPage: number | null;
  lastPage: number;
  searchUser: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = React.useState<string>("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const searchDebounce = useDebounce(search, 500);

  let page = Number(searchParams.get("page")) || 1;

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

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser({ userId });
    } catch (error) {
      if (error instanceof HttpError) {
        return toast.error(error.payload.message);
      }
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "userName",
      header: "Tên người dùng",
      cell: ({ row }) => {
        return (
          <div className="w-28 line-clamp-2">{row.getValue("userName")}</div>
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
      accessorKey: "following",
      header: "Đang theo dõi",
      cell: ({ row }) => {
        const following = parseInt(row.getValue("following")) || 0;
        return <div className="text-center">{following}</div>;
      },
    },
    {
      id: "actions",
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
                onClick={() => router.push(`/users/update/${user.id}`)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                Cập nhật người dùng
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteUser(user.id)}
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
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("search", searchDebounce);
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchDebounce]);

  return (
    <div className="w-full bg-background p-4 rounded-md">
      <div className="flex md:items-center flex-col md:flex-row py-4 gap-4">
        <Input
          placeholder="Tìm người dùng..."
          defaultValue={searchUser}
          onChange={handleOnSearch}
          className="w-full md:max-w-sm"
        />
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
                      {getValue(column.id)}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href={`/users/create`}
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
          {table.getFilteredSelectedRowModel().rows.length} trên{" "}
          {table.getFilteredRowModel().rows.length} cột được chọn.
        </div>
        <div className="flex-1 text-sm text-muted-foreground">
          Trang {page} trên tổng {lastPage} trang.
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
