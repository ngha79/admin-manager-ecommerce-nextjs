'use client'

import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import CustomUploadAdapter from '@/hooks/CustomUploadAdapter'
import { cn } from '@/lib/utils'
import { updateProfileShopByAdmin } from '@/utils/actions/shop'
import { createUser, updateProfileUserByAdmin } from '@/utils/actions/user'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { zodResolver } from '@hookform/resolvers/zod'
import Editor from 'ckeditor5-custom-build'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface IShop {
  id: string
  userName: string
  email: string
  avatar: string
  background: string
  phoneNumber: number
  money: number
  isActive: string
  description: string
  address: {
    phoneNumber: string
    userName: string
    address: string
  }
}

const shopValidator = z.object({
  userName: z.string().min(4, { message: 'Tên người dùng tối thiểu 4 ký tự.' }),
  description: z.string().min(1, { message: 'Bạn chưa thêm mô tả cho Shop.' }),
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

type TUserValidator = z.infer<typeof shopValidator>

const FormUpdate = ({ user }: { user: IShop }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [avatar, setAvatar] = useState<string>('')
  const [background, setBackground] = useState<string>('')
  const [fileAvatar, setFileAvatar] = useState<any>(null)
  const [fileBackground, setFileBackground] = useState<any>(null)
  const avatarUser = useRef<HTMLInputElement>(null)
  const backgroundUser = useRef<HTMLInputElement>(null)

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
    }
  }
  const handleUploadBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = URL.createObjectURL(e.target.files[0])
      setBackground(image)
      setFileBackground(e.target.files[0])
    }
  }

  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TUserValidator>({
    resolver: zodResolver(shopValidator),
  })

  const onSubmit = async ({
    phoneNumber,
    userName,
    address,
    description,
  }: TUserValidator) => {
    setIsLoading(true)
    const form = new FormData()
    form.append('userName', userName)
    form.append('phoneNumber', phoneNumber)
    form.append('addressUpdate', JSON.stringify(address))
    form.append('description', JSON.stringify(description))
    if (fileAvatar) form.append('fileAvatar', fileAvatar)
    if (fileBackground) form.append('fileBackground', fileBackground)
    const res = await updateProfileShopByAdmin(user.id, form)
    setIsLoading(false)
    if (res.error) {
      return toast.error(res.message)
    }
    toast.success('Cập nhật người dùng thành công.')
    router.replace('/shop')
  }

  const handleCancelUpdateImage = (type?: string) => {
    if (type) {
      setAvatar('')
      setFileAvatar(null)
    } else {
      setBackground('')
      setFileBackground(null)
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

  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return new CustomUploadAdapter(loader)
    }
  }
  return (
    <div className="p-4 flex flex-col max-w-7xl w-full mx-auto gap-4">
      <h1 className="text-lg text-gray-700 font-bold">Tạo người dùng mới</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="****@gmail.com"
              defaultValue={user.email}
              disabled
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <Label htmlFor="userName">Tên người dùng</Label>
            <Input
              placeholder="Nguyễn Văn A"
              {...register('userName')}
              defaultValue={user.userName}
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
              placeholder="************"
              disabled
            />
          </div>
          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <Label htmlFor="phoneNumber">Số điện thoại</Label>
            <Input
              placeholder="0123456789"
              {...register('phoneNumber')}
              defaultValue={user.phoneNumber}
              className={cn({
                'focus-visible:ring-red-500': errors.phoneNumber,
              })}
            />
            {errors?.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Trạng thái hoạt động</Label>
            <Select defaultValue={user.isActive}>
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
                  <SelectItem
                    value="band"
                    className="text-xs"
                  >
                    Cấm hoạt động
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Tài khoản</Label>
            <Input
              type="number"
              value={user.money}
              disabled
            />
          </div>
        </div>
        <h1 className="font-medium">Địa chỉ bán hàng</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <Label htmlFor="address-detail">Địa chỉ</Label>
            <Input
              type="text"
              {...register('address.address')}
              defaultValue={user.address?.address}
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
              defaultValue={user.address?.phoneNumber}
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
              defaultValue={user.address?.userName}
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
          <div className="flex items-center flex-col justify-center gap-4">
            <div
              className="lg:w-64 md:w-52 md:h-52 w-40 rounded-full lg:h-64 h-40 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 shadow-lg relative"
              onClick={onUploadAvatar}
            >
              <Image
                alt="avatar user"
                src={avatar || user.avatar}
                fill
                className="lg:w-64 md:w-52 md:h-52 w-40 hover:opacity-90 rounded-full lg:h-64 h-40 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 shadow-lg relative"
              />
              <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="space-x-4">
              <Button onClick={onUploadAvatar}>Thay ảnh</Button>
              {avatar ? (
                <Button
                  variant={'destructive'}
                  onClick={() => handleCancelUpdateImage('avatar')}
                >
                  Hủy
                </Button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="thumb">Background</Label>
          <Input
            type="file"
            className="hidden"
            ref={backgroundUser}
            onChange={handleUploadBackground}
          />
          <div className="flex items-center flex-col justify-center gap-4">
            <div
              className="lg:w-72 md:w-64 md:h-48 w-52 lg:h-56 h-40 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 rounded-md shadow-lg relative"
              onClick={onUploadBackground}
            >
              <Image
                alt="avatar user"
                src={background || user.background}
                fill
                className="lg:w-72 md:w-64 md:h-48 w-52 lg:h-56 h-40 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 rounded-md shadow-lg relative"
              />
              <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="space-x-4">
              <Button onClick={onUploadBackground}>Thay ảnh</Button>
              {background ? (
                <Button
                  variant={'destructive'}
                  onClick={() => handleCancelUpdateImage()}
                >
                  Hủy
                </Button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-4">
          <h1 className="text-lg font-medium">Giới thiệu về Shop</h1>
          <CKEditor
            editor={Editor}
            config={editorConfiguration}
            onReady={() => {
              register('description')
            }}
            data={user.description}
            onChange={(event, editor) => {
              const data = editor.getData()
              setValue('description', data)
            }}
          />
          {errors?.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? <Loading /> : null}
          Cập nhật
        </Button>
      </form>
    </div>
  )
}

export default FormUpdate
