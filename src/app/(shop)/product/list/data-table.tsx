"use client";

import * as React from "react";
import { toast } from "sonner";
import Image from "next/image";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  deleteProduct,
  publishProducts,
  unpublishProducts,
} from "@/utils/actions/product";
import { HttpError } from "@/lib/http";
import { ResponseExceptions } from "@/lib/utils";
import { reFetchProducts } from "@/utils/server";
import useDebounce from "@/hooks/useDebounce";

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
  id: number;
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

interface TypeColumnInterface {
  name: string;
  brand: string;
  price: string;
  sold: string;
  isPublish: string;

  [key: string]: string;
}

export const TypeColumn: TypeColumnInterface = {
  name: "Tên sản phẩm",
  brand: "Danh mục",
  price: "Giá sản phẩm",
  sold: "Đã bán",
  isPublish: "Trạng thái",
};

export default function DataTableDemo({
  products,
  prevPage,
  nextPage,
  lastPage,
  search,
}: {
  products: Product[];
  prevPage: number | null;
  nextPage: number | null;
  lastPage: number;
  search: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchProducts, setSearch] = React.useState<string>("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  let page = Number(searchParams.get("page")) || 1;
  const searchDebounce = useDebounce(searchProducts, 500);

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct({ productId });
      await reFetchProducts();
      toast.success("Xóa sản phẩm thành công.");
    } catch (error) {
      if (error instanceof HttpError) {
        return toast.error(error.payload.message);
      }
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };

  const handlePublishProduct = async (value: string, productId: string) => {
    try {
      if (value === "publish") {
        await publishProducts({ productIds: [productId] });
      } else {
        await unpublishProducts({ productIds: [productId] });
      }
      await reFetchProducts();
      toast.success("Cập nhật sản phẩm thành công.");
    } catch (error) {
      if (error instanceof HttpError) {
        return toast.error(error.payload.message);
      }
      toast.error(ResponseExceptions.DEFAULT_ERROR);
    }
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Tên sản phẩm",
      cell: ({ row }) => {
        const images: ProductImage = row.original.picture[0];
        return (
          <div className="flex items-center justify-start gap-2">
            <Image
              alt="product thumb"
              src={images?.product_thumb}
              width={64}
              height={64}
              className="w-16 h-16 rounded-sm"
            />
            <div className="capitalize w-28 line-clamp-2">
              {row.getValue("name")}
            </div>
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Giá sản phẩm
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "sold",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Đã bán
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const sold = parseInt(row.getValue("sold")) || 0;
        return <div className="text-center">{sold}</div>;
      },
    },
    {
      accessorKey: "isPublish",
      header: "Trạng thái",
      cell: ({ row }) => {
        const sold = row.getValue("isPublish") ? "publish" : "unpublish";
        const product = row.original;

        return (
          <Select
            value={sold}
            onValueChange={(value) => handlePublishProduct(value, product.id)}
          >
            <SelectTrigger className="w-28 text-xs">
              <SelectValue placeholder="Select a fruit" className="text-xs" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-xs">
                  Trạng thái sản phẩm
                </SelectLabel>
                <SelectItem value="publish" className="text-xs">
                  Active
                </SelectItem>
                <SelectItem value="unpublish" className="text-xs">
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
        const product = row.original;
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
                onClick={() => navigator.clipboard.writeText(product.id)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                Copy mã sản phẩm
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/product/update/${product.id}`)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                Cập nhật sản phẩm
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteProduct(product.id)}
                className="hover:bg-destructive cursor-pointer hover:text-white"
              >
                Xóa sản phẩm
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters,
      columnVisibility,
    },
  });

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

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("search", searchDebounce);
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchDebounce]);

  return (
    <div className="w-full bg-background p-4 rounded-md">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Tìm sản phẩm..."
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
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
                  Không có sản phẩm nào.
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
