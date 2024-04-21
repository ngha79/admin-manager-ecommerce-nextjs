'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateVoucher } from '@/utils/actions/vouchers'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export const UpdateVoucherCredentialsValidator = z
  .object({
    discount_code: z.string().min(6, {
      message: 'Mã giảm giá ít nhất 6 ký tự.',
    }),
    discount_description: z
      .string()
      .min(1, {
        message: 'Bạn chưa thêm mô tả.',
      })
      .max(200, {
        message: 'Mô tả quá dài.',
      }),
    discount_is_active: z.boolean(),
    discount_max_uses: z.coerce
      .number()
      .positive()
      .min(1, { message: 'Bạn chưa thêm số lượng mã giảm giá.' }),
    discount_name: z.string().min(1, {
      message: 'Bạn chưa thêm tên giới thiệu.',
    }),
    discount_type: z.string(),
    discount_use_count: z.coerce.number().int().min(0),
    discount_value: z.coerce
      .number()
      .int()
      .positive()
      .min(1, { message: 'Bạn chưa thêm giá trị của mã giảm giá.' }),
    discount_min_order_value: z.coerce.number().int().positive().min(1, {
      message: 'Bạn chưa thêm giá trị tối thiểu áp dụng mã giảm giá.',
    }),
    discount_max_value: z.coerce.number().int().positive().min(1, {
      message: 'Bạn chưa thêm giá trị tối đa giảm của mã giảm giá.',
    }),
    discount_apply_type: z.enum(['all', 'specific']),
    discount_uses_per_user: z.coerce.number().int().positive().min(1, {
      message: 'Bạn chưa thêm số lượng mã giảm giá mỗi người có thể dùng.',
    }),
    discount_start_date: z.coerce.date(),
    discount_end_date: z.coerce
      .date()
      .refine((data) => new Date(data) > new Date(), {
        message: 'Thời gian kết thúc không hợp lệ.',
      }),
  })
  .refine((data) => data.discount_end_date > data.discount_start_date, {
    message: 'Thời gian kết thúc phải sau thời gian bắt đầu.',
    path: ['discount_end_date'],
  })

export type IUpdateVoucherCredentialsValidator = z.infer<
  typeof UpdateVoucherCredentialsValidator
>

const FormUpdate = ({ id, voucher }: any) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateVoucherCredentialsValidator>({
    resolver: zodResolver(UpdateVoucherCredentialsValidator),
  })
  const onSubmit = async (formData: IUpdateVoucherCredentialsValidator) => {
    setIsLoading(true)
    const response = await updateVoucher(id, formData)
    setIsLoading(false)
    if (response.error) return toast.error(response.message)
    toast.success('Cập nhật mã giảm giá thành công')
    router.replace('/vouchers')
  }

  function setDate(date: Date) {
    const isoString = new Date(date).toISOString()
    return isoString.substring(0, ((isoString.indexOf('T') | 0) + 6) | 0)
  }
  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>Tên giới thiệu</Label>
          <Input
            {...register('discount_name', { value: voucher.discount_name })}
          />
          {errors?.discount_name && (
            <p className="text-sm text-red-500">
              {errors?.discount_name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Mã giảm giá</Label>
          <Input
            {...register('discount_code', { value: voucher.discount_code })}
          />
          {errors?.discount_code && (
            <p className="text-sm text-red-500">
              {errors.discount_code.message}
            </p>
          )}
        </div>
        <div className="flex flex-col col-span-2 gap-2">
          <Label>Mô tả</Label>
          <textarea
            rows={3}
            className="resize-none border border-gray-300 rounded-md p-2"
            {...register('discount_description', {
              value: voucher.discount_description,
            })}
          />
          {errors?.discount_description && (
            <p className="text-sm text-red-500">
              {errors.discount_description.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Loại mã giảm giá</Label>
          <Input
            {...register('discount_type', {
              value: voucher.discount_type,
            })}
          />
          {errors?.discount_type && (
            <p className="text-sm text-red-500">
              {errors.discount_type.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Giá trị</Label>
          <Input
            type="number"
            {...register('discount_value', {
              value: voucher.discount_value,
            })}
          />
          {errors?.discount_value && (
            <p className="text-sm text-red-500">
              {errors.discount_value.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Số lượng</Label>
          <Input
            type="number"
            {...register('discount_max_uses', {
              value: voucher.discount_max_uses,
            })}
          />
          {errors?.discount_max_uses && (
            <p className="text-sm text-red-500">
              {errors.discount_max_uses.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Giá trị tối đa giảm</Label>
          <Input
            type="number"
            {...register('discount_max_value', {
              value: voucher.discount_max_value,
            })}
          />
          {errors?.discount_max_value && (
            <p className="text-sm text-red-500">
              {errors.discount_max_value.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Giá trị tối thiểu áp dụng</Label>
          <Input
            type="number"
            {...register('discount_min_order_value', {
              value: voucher.discount_min_order_value,
            })}
          />
          {errors?.discount_min_order_value && (
            <p className="text-sm text-red-500">
              {errors.discount_min_order_value.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Đã sử dụng</Label>
          <Input
            type="number"
            {...register('discount_use_count', {
              value: voucher.discount_use_count,
            })}
          />
          {errors?.discount_use_count && (
            <p className="text-sm text-red-500">
              {errors.discount_use_count.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Lượt dùng mỗi người</Label>
          <Input
            type="number"
            {...register('discount_uses_per_user', {
              value: voucher.discount_uses_per_user,
            })}
          />
          {errors?.discount_uses_per_user && (
            <p className="text-sm text-red-500">
              {errors.discount_uses_per_user.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Áp dụng với</Label>
          <Input
            {...register('discount_apply_type', {
              value: voucher.discount_apply_type,
            })}
          />
          {errors?.discount_apply_type && (
            <p className="text-sm text-red-500">
              {errors.discount_apply_type.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Trạng thái</Label>
          <Input
            {...register('discount_is_active', {
              value: voucher.discount_is_active,
            })}
          />
          {errors?.discount_is_active && (
            <p className="text-sm text-red-500">
              {errors.discount_is_active.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Ngày bắt đầu</Label>
          <Input
            type="datetime-local"
            {...register('discount_start_date')}
            defaultValue={setDate(voucher.discount_start_date)}
          />
          {errors?.discount_start_date && (
            <p className="text-sm text-red-500">
              {errors.discount_start_date.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Ngày kết thúc</Label>
          <Input
            type="datetime-local"
            {...register('discount_end_date')}
            defaultValue={setDate(voucher.discount_end_date)}
          />
          {errors?.discount_end_date && (
            <p className="text-sm text-red-500">
              {errors.discount_end_date.message}
            </p>
          )}
        </div>
      </div>
      <Button disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Cập nhật
      </Button>
    </form>
  )
}

export default FormUpdate
