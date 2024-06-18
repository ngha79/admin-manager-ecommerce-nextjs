// "use client";

// import React, { useTransition } from "react";
// import { z } from "zod";
// import Link from "next/link";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Button, buttonVariants } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { HttpError } from "@/lib/http";
// import { cn, ResponseExceptions } from "@/lib/utils";
// import { createVoucher } from "@/utils/actions/vouchers";
// import { reFetchDiscounts } from "@/utils/server";

// export const UpdateVoucherCredentialsValidator = z
//   .object({
//     discount_code: z.string().min(6, {
//       message: "Mã giảm giá ít nhất 6 ký tự.",
//     }),
//     discount_description: z
//       .string()
//       .min(1, {
//         message: "Bạn chưa thêm mô tả.",
//       })
//       .max(200, {
//         message: "Mô tả quá dài.",
//       }),
//     discount_is_active: z.boolean(),
//     discount_max_uses: z.coerce
//       .number()
//       .int()
//       .min(1, { message: "Bạn chưa thêm số lượng mã giảm giá." }),
//     discount_name: z.string().min(1, {
//       message: "Bạn chưa thêm tên giới thiệu.",
//     }),
//     discount_type: z.string(),
//     discount_value: z.coerce
//       .number()
//       .min(1, { message: "Bạn chưa thêm giá trị của mã giảm giá." }),
//     discount_min_order_value: z.coerce.number().int().min(1, {
//       message: "Bạn chưa thêm giá trị tối thiểu áp dụng mã giảm giá.",
//     }),
//     discount_max_value: z.coerce.number().int().min(1, {
//       message: "Bạn chưa thêm giá trị tối đa giảm của mã giảm giá.",
//     }),
//     discount_apply_type: z.string(),
//     discount_uses_per_user: z.coerce.number().int().min(1, {
//       message: "Bạn chưa thêm số lượng mã giảm giá mỗi người có thể dùng.",
//     }),
//     discount_start_date: z.coerce.date(),
//     discount_end_date: z.coerce
//       .date()
//       .refine((data) => new Date(data) > new Date(), {
//         message: "Thời gian kết thúc không hợp lệ.",
//       }),
//   })
//   .refine(
//     (data) =>
//       (data.discount_type === "percent" && data.discount_value < 100) ||
//       (data.discount_type === "value" && data.discount_value < 1000000),
//     {
//       message:
//         "Giá trị phần trăm phải nhỏ hơn 100% hoặc giá trị không vượt quá 1.000.000 khi là giảm giá trực tiếp.",
//       path: ["discount_value"],
//     }
//   )
//   .refine((data) => data.discount_end_date > data.discount_start_date, {
//     message: "Thời gian kết thúc phải sau thời gian bắt đầu.",
//     path: ["discount_end_date"],
//   });

// export type IUpdateVoucherCredentialsValidator = z.infer<
//   typeof UpdateVoucherCredentialsValidator
// >;

// const Page = () => {
//   const router = useRouter();
//   const [isLoading, startTransition] = useTransition();
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<IUpdateVoucherCredentialsValidator>({
//     resolver: zodResolver(UpdateVoucherCredentialsValidator),
//   });
//   const onSubmit = async (data: IUpdateVoucherCredentialsValidator) => {
//     startTransition(async () => {
//       try {
//         await createVoucher(data);
//         await reFetchDiscounts();
//         toast.success("Thêm mã giảm giá thành công");
//         router.replace("/vouchers");
//       } catch (error) {
//         if (error instanceof HttpError) {
//           toast.error(error.payload.message);
//         } else {
//           toast.error(ResponseExceptions.DEFAULT_ERROR);
//         }
//       }
//     });
//   };

//   function setDate(date: Date) {
//     const isoString = new Date(date).toISOString();
//     return isoString.substring(0, ((isoString.indexOf("T") | 0) + 6) | 0);
//   }

//   return (
//     <div className="container py-4">
//       <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//         <h1 className="font-bold text-2xl">Thêm mã giảm giá mới cho Shop</h1>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex flex-col gap-2">
//             <Label>Tên giới thiệu</Label>
//             <Input {...register("discount_name")} />
//             {errors?.discount_name && (
//               <p className="text-sm text-red-500">
//                 {errors?.discount_name.message}
//               </p>
//             )}
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label>Mã giảm giá</Label>
//             <Input {...register("discount_code")} />
//             {errors?.discount_code && (
//               <p className="text-sm text-red-500">
//                 {errors.discount_code.message}
//               </p>
//             )}
//           </div>
//           <div className="flex flex-col col-span-2 gap-2">
//             <Label>Mô tả</Label>
//             <textarea
//               rows={3}
//               className="resize-none border border-gray-300 rounded-md p-2"
//               {...register("discount_description")}
//             />
//             {errors?.discount_description && (
//               <p className="text-sm text-red-500">
//                 {errors.discount_description.message}
//               </p>
//             )}
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label>Loại mã giảm giá</Label>
//             <Select
//               defaultValue="percent"
//               {...register("discount_type", { value: "percent" })}
//               onValueChange={(value: "percent" | "value") => {
//                 setValue("discount_type", value);
//               }}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Chọn phân loại..." />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectItem value="percent">Phần trăm</SelectItem>
//                   <SelectItem value="value">Giá trị</SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//             {errors?.discount_type && (
//               <p className="text-sm text-red-500">
//                 {errors.discount_type.message}
//               </p>
//             )}
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label>Giá trị</Label>
//             <Input type="number" min={1} {...register("discount_value")} />
//             {errors?.discount_value && (
//               <p className="text-sm text-red-500">
//                 {errors.discount_value.message}
//               </p>
//             )}
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label>Số lượng</Label>
//             <Input type="number" min={1} {...register("discount_max_uses")} />
//             {errors?.discount_max_uses && (
//               <p className="text-sm text-red-500">
//                 {errors.discount_max_uses.message}
//               </p>
//             )}
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label>Giá trị tối đa giảm</Label>
//             <Input type="number" min={1} {...register("discount_max_value")} />
//             {errors?.discount_max_value && (
//               <p className="text-sm text-red-500">
//                 {errors.discount_max_value.message}
//               </p>
//             )}
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label>Giá trị tối thiểu áp dụng</Label>
//             <Input
//               type="number"
//               min={1}
//               {...register("discount_min_order_value")}
//             />
//             {errors?.discount_min_order_value && (
//               <p className="text-sm text-red-500">
//                 {errors.discount_min_order_value.message}
//               </p>
//             )}
//           </div>

//           <div className="flex flex-col gap-2">
//             <Label>Lượt dùng mỗi người</Label>
//             <Input
//               type="number"
//               min={1}
//               {...register("discount_uses_per_user")}
//             />
//             {errors?.discount_uses_per_user && (
//               <p className="text-sm text-red-500">
//                 {errors.discount_uses_per_user.message}
//               </p>
//             )}
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label>Áp dụng với</Label>
//             <Select
//               defaultValue="all"
//               {...register("discount_apply_type", { value: "all" })}
//               onValueChange={(value: "all" | "specific") =>
//                 setValue("discount_apply_type", value)
//               }
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Chọn phân loại..." />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectItem value="all">Tất cả sản phẩm</SelectItem>
//                   <SelectItem value="specific">Sản phẩm chỉ định</SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//             {errors?.discount_apply_type && (
//               <p className="text-sm text-red-500">
//                 {errors.discount_apply_type.message}
//               </p>
//             )}
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label>Trạng thái</Label>
//             <Select
//               defaultValue="false"
//               {...register("discount_is_active", { value: false })}
//               onValueChange={(value) => {
//                 setValue("discount_is_active", value ? true : false);
//               }}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Chọn phân loại..." />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectItem value="true">Hoạt động</SelectItem>
//                   <SelectItem value="false">Chưa hoạt động</SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//             {errors?.discount_is_active && (
//               <p className="text-sm text-red-500">
//                 {errors.discount_is_active.message}
//               </p>
//             )}
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label>Ngày bắt đầu</Label>
//             <Input
//               type="datetime-local"
//               {...register("discount_start_date")}
//               defaultValue={setDate(new Date())}
//             />
//             {errors?.discount_start_date && (
//               <p className="text-sm text-red-500">
//                 {errors.discount_start_date.message}
//               </p>
//             )}
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label>Ngày kết thúc</Label>
//             <Input
//               type="datetime-local"
//               {...register("discount_end_date")}
//               defaultValue={setDate(new Date())}
//             />
//             {errors?.discount_end_date && (
//               <p className="text-sm text-red-500">
//                 {errors.discount_end_date.message}
//               </p>
//             )}
//           </div>
//         </div>
//         <div className="flex items-center justify-end gap-8">
//           <Button disabled={isLoading}>
//             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//             Thêm mã giảm giá
//           </Button>
//           <Link
//             href="/vouchers"
//             className={cn(buttonVariants({ variant: "destructive" }))}
//           >
//             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//             Hủy
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Page;

import React from "react";

const Page = () => {
  return <div>create</div>;
};

export default Page;
