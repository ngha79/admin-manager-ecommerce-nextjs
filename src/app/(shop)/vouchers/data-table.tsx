'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDown, MoreHorizontal, Plus } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'
import useDebounce from '@/hooks/useDebounce'
import { deleteVoucher } from '@/utils/actions/vouchers'
import { toast } from 'sonner'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export type Voucher = {
  id: string
  discount_name: string
  discount_description: string
  discount_code: string
  discount_type: string
  discount_value: number
  discount_start_date: Date
  discount_end_date: Date
  discount_max_uses: number
  discount_max_value: number
  discount_use_count: number
  discount_uses_per_user: number
  discount_min_order_value: number
  discount_is_active: string
  discount_apply_type: string
}

export const TypeColumn = {
  discount_name: 'Tên',
  discount_description: 'Mô tả',
  discount_code: 'Mã giảm giá',
  discount_type: 'Kiểu giảm giá',
  discount_value: 'Giá trị',
  discount_start_date: 'Ngày bắt đầu',
  discount_end_date: 'Ngày kết thúc',
  discount_max_uses: 'Tổng số lượng',
  discount_max_value: 'Giảm tối đa',
  discount_use_count: 'Đã sử dụng',
  discount_uses_per_user: 'Lượt dùng mỗi người dùng',
  discount_min_order_value: 'Giá trị tối thiểu áp dụng',
  discount_is_active: 'Trạng thái',
  discount_apply_type: 'Áp dụng với sản phẩm',
}

export default function DataTableDemo({
  voucher,
  prevPage,
  nextPage,
  lastPage,
  searchVoucher,
}: {
  voucher: Voucher[]
  prevPage: number | null
  nextPage: number | null
  lastPage: number
  searchVoucher: string
}) {
  const [search, setSearch] = React.useState<string>('')
  const searchDebounce = useDebounce(search, 500)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const handleDeleteVoucher = async (id: string) => {
    const res = await deleteVoucher(id)
    if (res.error) return toast.error(res.message)
    toast.success('Xóa mã giảm giá thành công.')
    router.refresh()
  }

  const columns: ColumnDef<Voucher>[] = [
    // {
    //   id: 'select',
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && 'indeterminate')
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: 'discount_name',
      header: 'Tên',
      cell: ({ row }) => {
        return (
          <div className="w-20 line-clamp-2">
            {row.getValue('discount_name')}
          </div>
        )
      },
    },

    {
      accessorKey: 'discount_description',
      header: 'Mô tả',
      cell: ({ row }) => (
        <div className="w-28 line-clamp-2">
          {row.getValue('discount_description')}
        </div>
      ),
    },
    {
      accessorKey: 'discount_code',
      header: ({ column }) => {
        return <span className="w-max">Mã giảm giá</span>
      },
      cell: ({ row }) => {
        const discount_code = row.getValue('discount_code') as string
        return (
          <div className="text-center font-medium">
            {discount_code.toUpperCase()}
          </div>
        )
      },
    },
    {
      accessorKey: 'discount_type',
      header: ({ column }) => {
        return <span className="w-max">Kiểu giảm giá</span>
      },
      cell: ({ row }) => {
        const sold =
          row.getValue('discount_type') === 'percent' ? 'Phần trăm' : 'Giá trị'
        return <div className="text-center  w-20">{sold}</div>
      },
    },
    {
      accessorKey: 'discount_value',
      header: ({ column }) => {
        return <span className="w-max">Giá trị</span>
      },
      cell: ({ row }) => {
        const discount_value = row.getValue('discount_value') as number
        return <div className="text-center  w-20">{discount_value}</div>
      },
    },
    {
      accessorKey: 'discount_max_uses',
      header: ({ column }) => {
        return <span className="w-max">Tổng số lượng</span>
      },
      cell: ({ row }) => {
        const discount_max_uses = row.getValue('discount_max_uses') as number
        return <div className="text-center  w-20">{discount_max_uses}</div>
      },
    },
    {
      accessorKey: 'discount_max_value',
      header: ({ column }) => {
        return <span className="w-max">Giảm tối đa</span>
      },
      cell: ({ row }) => {
        const discount_max_value = row.getValue('discount_max_value') as number
        return <div className="text-center w-20">{discount_max_value}</div>
      },
    },
    {
      accessorKey: 'discount_use_count',
      header: ({ column }) => {
        return <span className="w-max">Đã sử dụng</span>
      },
      cell: ({ row }) => {
        const discount_use_count = row.getValue('discount_use_count') as number
        return <div className="text-center  w-20">{discount_use_count}</div>
      },
    },
    {
      accessorKey: 'discount_uses_per_user',
      header: ({ column }) => {
        return <span className="w-max">Lượt dùng mỗi người dùng</span>
      },
      cell: ({ row }) => {
        const discount_uses_per_user = row.getValue(
          'discount_uses_per_user'
        ) as number
        return <div className="text-center  w-20">{discount_uses_per_user}</div>
      },
    },
    {
      accessorKey: 'discount_min_order_value',
      header: ({ column }) => {
        return <span className="w-max">Giá trị tối thiểu áp dụngg</span>
      },
      cell: ({ row }) => {
        const discount_min_order_value = row.getValue(
          'discount_min_order_value'
        ) as number
        return (
          <div className="text-center  w-20">{discount_min_order_value}</div>
        )
      },
    },
    {
      accessorKey: 'discount_is_active',
      header: ({ column }) => {
        return <span className="w-max">Trạng thái</span>
      },
      cell: ({ row }) => {
        const discount_is_active = row.getValue('discount_is_active') as number
        return (
          <div className="text-center  w-20">
            {discount_is_active ? 'Hoạt động' : 'Ngừng hoạt động'}
          </div>
        )
      },
    },
    {
      accessorKey: 'discount_apply_type',
      header: ({ column }) => {
        return <span className="w-max">Áp dụng với sản phẩm</span>
      },
      cell: ({ row }) => {
        const discount_apply_type =
          row.getValue('discount_apply_type') === 'all'
            ? 'Tất cả'
            : 'Sản phẩm chỉ định'
        return <div className="text-center  w-20">{discount_apply_type}</div>
      },
    },
    {
      accessorKey: 'discount_start_date',
      header: ({ column }) => {
        return <span className="w-max">Ngày bắt đầu</span>
      },
      cell: ({ row }) => {
        const discount_start_date = row.getValue('discount_start_date') as Date
        return (
          <div className="text-center  w-20">
            {format(new Date(discount_start_date), 'hh:mm MM/dd/yyyy')}
          </div>
        )
      },
    },
    {
      accessorKey: 'discount_end_date',
      header: ({ column }) => {
        return <span className="w-max">Ngày kết thúc</span>
      },
      cell: ({ row }) => {
        const discount_end_date = row.getValue('discount_end_date') as Date
        return (
          <div className="text-center  w-20">
            {format(new Date(discount_end_date), 'hh:mm MM/dd/yyyy')}
          </div>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const voucher = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(voucher.id)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/vouchers/update/${voucher.id}`)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                Cập nhật Voucher
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteVoucher(voucher.id)}
                className="hover:bg-destructive cursor-pointer hover:text-white"
              >
                Xóa Voucher
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  const table = useReactTable({
    data: voucher,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  let page = Number(searchParams.get('page')) || 1
  const handleSetNextPage = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (page < lastPage) {
      params.set('page', `${page + 1}`)
      router.replace(`${pathname}?${params.toString()}`)
    }
  }
  const handleSetPrevPage = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (page > 1) {
      params.set('page', `${page - 1}`)
      router.replace(`${pathname}?${params.toString()}`)
    }
  }

  const handleOnSearch = (e) => {
    setSearch(e.target.value)
  }

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set('search', searchDebounce)
    router.replace(`${pathname}?${params.toString()}`)
  }, [searchDebounce])

  return (
    <div className="w-full bg-background p-4 rounded-md">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Tìm sản phẩm..."
          defaultValue={searchVoucher}
          onChange={handleOnSearch}
          className="max-w-sm"
        />
        <Link
          href={'/vouchers/create'}
          className={cn(buttonVariants(), 'flex items-center gap-2')}
        >
          <Plus size={18} />
          Thêm mã giảm giá mới
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto"
            >
              Hiển thị <ChevronDown className="ml-2 h-4 w-4" />
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
                )
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
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
          {table.getFilteredSelectedRowModel().rows.length} trên{' '}
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
  )
}
