'use client'

import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { createUser } from '@/utils/actions/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { StatusShop } from '../data-table-shops'
import CustomUploadAdapter from '@/hooks/CustomUploadAdapter'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build'
import { createShop } from '@/utils/actions/shop'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface IShop {
  userName: string
  email: string
  avatar: File
  background: File
  phoneNumber: string
  password: string
  description: string
  isActive: StatusShop
  address: [
    {
      address: string
      userName: string
      phoneNumber: string
    }
  ]
}

const userValidator = z.object({
  userName: z.string().min(4, { message: 'Tên người dùng tối thiểu 4 ký tự.' }),
  email: z.string().email({
    message: 'Email không đúng định dạng.',
  }),
  password: z.string().min(6, { message: 'Mật khẩu tối thiểu 6 ký tự.' }),
  phoneNumber: z
    .string()
    .length(10, { message: 'Số điện thoại không đúng định dạng.' }),
  address: z.object({
    address: z.string().min(2, { message: 'Địa chỉ không phù hợp.' }),
    userName: z
      .string()
      .min(4, { message: 'Tên người dùng tối thiểu 4 ký tự.' }),
    phoneNumber: z
      .string()
      .length(10, { message: 'Số điện thoại không đúng định dạng.' }),
  }),
})

type TUserValidator = z.infer<typeof userValidator>

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<string>('unactive')
  const [avatar, setAvatar] = useState<string>('')
  const [background, setBackground] = useState<string>('')
  const [fileAvatar, setFileAvatar] = useState<any>(null)
  const [fileBackground, setFileBackground] = useState<any>(null)
  const [errorAvatar, setErrorAvatar] = useState<string>('')
  const [errorBackground, setErrorBackground] = useState<string>('')
  const avatarUser = useRef<HTMLInputElement>(null)
  const backgroundUser = useRef<HTMLInputElement>(null)
  const [description, setDescription] = useState<string>('')

  const handleOnChange = (data: string) => {
    setDescription(data)
  }

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return new CustomUploadAdapter(loader)
    }
  }

  const editorConfiguration = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
    ],
    extraPlugins: [uploadPlugin],
  }

  const onUploadAvatar = () => {
    avatarUser?.current?.click()
  }

  const onUploadBackground = () => {
    backgroundUser?.current?.click()
  }

  const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = URL.createObjectURL(e.target.files[0])
      setAvatar(image)
      setFileAvatar(e.target.files[0])
      setErrorAvatar('')
    }
  }
  const handleUploadBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = URL.createObjectURL(e.target.files[0])
      setBackground(image)
      setFileBackground(e.target.files[0])
      setErrorBackground('')
    }
  }

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserValidator>({
    resolver: zodResolver(userValidator),
  })

  const onSubmit = async ({
    email,
    password,
    phoneNumber,
    userName,
    address,
  }: TUserValidator) => {
    if (!fileAvatar) return setErrorAvatar('Bạn chưa thêm Avatar.')
    if (!fileBackground) return setErrorAvatar('Bạn chưa thêm Background.')
    setIsLoading(true)
    const form = new FormData()
    form.append('userName', userName)
    form.append('password', password)
    form.append('phoneNumber', phoneNumber)
    form.append('email', email)
    form.append('fileAvatar', fileAvatar)
    form.append('fileBackground', fileBackground)
    form.append('address', JSON.stringify(address))
    form.append('isActive', isActive)
    form.append('description', phoneNumber)
    const res = await createShop(form)
    setIsLoading(false)
    if (res.message && typeof res.message == 'string') {
      toast.error(res.message || 'Không thể đăng ký, vui lòng thử lại sau.')
      return
    }
    toast.success('Thêm người dùng thành công.')
    router.push('/shop')
  }

  return (
    <div className="p-4 flex flex-col max-w-7xl w-full mx-auto gap-4">
      <h1 className="text-lg text-gray-700 font-bold">Tạo Shop mới</h1>
      <form onSubmit={handleSubmit(onSubmit)}></form>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="****@gmail.com"
            {...register('email')}
            className={cn({
              'focus-visible:ring-red-500': errors.email,
            })}
          />
          {errors?.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
          <Label htmlFor="userName">Tên Shop</Label>
          <Input
            placeholder="Nguyễn Văn A"
            {...register('userName')}
            className={cn({
              'focus-visible:ring-red-500': errors.userName,
            })}
          />
          {errors?.userName && (
            <p className="text-sm text-red-500">{errors.userName.message}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            type="password"
            {...register('password')}
            className={cn({
              'focus-visible:ring-red-500': errors.password,
            })}
          />
          {errors?.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
          <Label htmlFor="phoneNumber">Số điện thoại</Label>
          <Input
            placeholder="0123456789"
            {...register('phoneNumber')}
            className={cn({
              'focus-visible:ring-red-500': errors.phoneNumber,
            })}
          />
          {errors?.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Trạng thái hoạt động</Label>
          <Select
            defaultValue={isActive}
            onValueChange={(value) => setIsActive(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder="Select a fruit"
                className="text-xs"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-xs">Trạng thái Shop</SelectLabel>
                <SelectItem
                  value="active"
                  className="text-xs"
                >
                  Hoạt động
                </SelectItem>
                <SelectItem
                  value="unactive"
                  className="text-xs"
                >
                  Ngừng hoạt động
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <h1 className="font-medium">Địa chỉ bán hàng</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
          <Label htmlFor="address-detail">Địa chỉ</Label>
          <Input
            type="text"
            {...register('address.address')}
            id="address-detail"
            className={cn({
              'focus-visible:ring-red-500': errors.address?.address,
            })}
          />
          {errors?.address?.address && (
            <p className="text-sm text-red-500">
              {errors.address?.address.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
          <Label htmlFor="address.phoneNumber">Số điện thoại</Label>
          <Input
            placeholder="0123456789"
            {...register('address.phoneNumber')}
            id="address.phoneNumber"
            className={cn({
              'focus-visible:ring-red-500': errors.address?.phoneNumber,
            })}
          />
          {errors?.address?.phoneNumber && (
            <p className="text-sm text-red-500">
              {errors.address.phoneNumber.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
          <Label htmlFor="address.userName">Tên người bán</Label>
          <Input
            placeholder="Nguyễn Văn A"
            id="address.userName"
            {...register('address.userName')}
            className={cn({
              'focus-visible:ring-red-500': errors.address?.userName,
            })}
          />
          {errors?.address?.userName && (
            <p className="text-sm text-red-500">
              {errors.address.userName.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Label htmlFor="thumb">Avatar</Label>
        <Input
          type="file"
          className="hidden"
          ref={avatarUser}
          onChange={handleUploadAvatar}
        />
        <div className="flex flex-wrap gap-2">
          <div
            className="lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 rounded-md shadow-lg relative"
            onClick={onUploadAvatar}
          >
            <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          {avatar ? (
            <div className="relative lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 border rounded-md overflow-hidden">
              <Image
                alt="thumb"
                src={avatar}
                fill
              />
            </div>
          ) : null}
        </div>
        {errorAvatar && <p className="text-sm text-red-500">{errorAvatar}</p>}
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="thumb">Background</Label>
        <Input
          type="file"
          className="hidden"
          ref={backgroundUser}
          onChange={handleUploadBackground}
        />
        <div className="flex flex-wrap gap-2">
          <div
            className="lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 rounded-md shadow-lg relative"
            onClick={onUploadBackground}
          >
            <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          {background ? (
            <div className="relative lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 border rounded-md overflow-hidden">
              <Image
                alt="thumb"
                src={background}
                fill
              />
            </div>
          ) : null}
        </div>
        {errorBackground && (
          <p className="text-sm text-red-500">{errorBackground}</p>
        )}
      </div>
      <div className="flex flex-col gap-4 py-4">
        <h1 className="text-lg font-medium">Giới thiệu về Shop</h1>
        <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data={description}
          onChange={(event, editor) => {
            const data = editor.getData()
            handleOnChange(data)
          }}
        />
      </div>
      <Button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        {isLoading ? <Loading /> : null}
        Thêm người dùng
      </Button>
    </div>
  )
}

export default Page
