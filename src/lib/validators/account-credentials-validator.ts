import { z } from 'zod'

export const AuthCredentialsValidator = z.object({
  email: z.string().email({
    message: 'Email không đúng định dạng.',
  }),
  password: z.string().min(8, {
    message: 'Mật khẩu ít nhất 8 ký tự.',
  }),
  userName: z.string().min(4, {
    message: 'Tên người dùng ít nhất 4 ký tự.',
  }),
  phoneNumber: z.string().min(8, {
    message: 'Số điện thoại không đúng định dạng.',
  }),
})

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>

export const AuthLoginCredentialsValidator = z.object({
  email: z.string().email({
    message: 'Email không đúng định dạng.',
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu ít nhất 6 ký tự.',
  }),
})

export type IAuthLoginCredentialsValidator = z.infer<
  typeof AuthLoginCredentialsValidator
>

export const ProfileUserValidator = z.object({
  userName: z.string().min(4, {
    message: 'Tên người dùng ít nhất 4 ký tự.',
  }),
  phoneNumber: z.string().length(10, {
    message: 'Số điện thoại không đúng định dạng.',
  }),
})

export type IProfileUserValidator = z.infer<typeof ProfileUserValidator>

export const PasswordUserValidator = z.object({
  currentPassword: z.string().min(6, {
    message: 'Mật khẩu ít nhất 6 ký tự.',
  }),
  newPassword: z.string().min(6, {
    message: 'Mật khẩu ít nhất 6 ký tự.',
  }),
})

export type IPasswordUserValidator = z.infer<typeof PasswordUserValidator>
