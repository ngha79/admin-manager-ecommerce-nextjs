'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Delete, Plus } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
// import { createProduct } from '@/utils/actions/product'
import Loading from '@/components/Loading'
import ProductAttribute from './ProductAttribute'
import FormAddProductAttribute from './FormAddProductAttribute'
import { updateProduct } from '@/utils/actions/product'
import ProductAttributeNew from './ProductAttributeNew'

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
}

interface IProduct {
  name: string
  brand: string
  price: number
  picture: IProductImage[]
  isPublish: boolean
  detail: string
  attributes: IProductAttribute[]
  sold: number
  id: string
}

interface IProductImage {
  id: number
  image_id: string
  product_image_url: string
  product_thumb: string
}

interface IProductAttribute {
  material: string
  size: string
  thumb: string
  file: File
  id: number
}

const productValidator = z.object({
  name: z.string().min(1, { message: 'Bạn chưa nhập tên sản phẩm.' }),
  detail: z
    .string({ required_error: 'Bạn chưa thêm mô tả cho sản phẩm.' })
    .min(1, { message: 'Bạn chưa thêm mô tả cho sản phẩm.' }),
  brand: z
    .string({ required_error: 'Bạn chưa chọn danh mục của sản phẩm.' })
    .min(1, { message: 'Bạn chưa chọn danh mục của sản phẩm.' }),
  price: z
    .number()
    .min(1000, { message: 'Giá của sản phẩm từ 1000đ trở lên.' }),
  picture: z.any(),
})

type TProductValidator = z.infer<typeof productValidator>

const Product = ({ product }: { product: IProduct }) => {
  let thumbProduct = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [imagesDelete, setImagesDelete] = useState<number[]>([])
  const [attributesDelete, setAttributesDelete] = useState<number[]>([])
  const [productUpdate, setProductUpdate] = useState<IProduct>({
    attributes: [],
    brand: '',
    detail: '',
    isPublish: true,
    name: '',
    picture: [],
    price: 0,
    sold: 0,
    id: '',
  })
  const [isLoading, setLoading] = useState<boolean>(false)

  const [listroductAttributeUpdate, setListProductAttributeUpdate] = useState<
    IProductAttribute[]
  >([])

  const [listroductAttributeNew, setListProductAttributeNew] = useState<
    IProductAttribute[]
  >([])

  const onUploadThumb = () => {
    thumbProduct?.current?.click()
  }

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    setError,
    formState: { errors },
  } = useForm<TProductValidator>({
    resolver: zodResolver(productValidator),
  })

  useEffect(() => {
    if (product) {
      setProductUpdate(product)
      setValue('brand', product.brand)
      setValue('detail', product.detail)
    }
  }, [product])

  const handleUploadThumb = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    Array.from(e.target.files).forEach((file) => {
      const image = URL.createObjectURL(file)
      setImages((images) => [...images, image])
    })
    setFiles((files) => [...files, ...e.target.files])
  }

  const handleAddProductAttribute = (value: IProductAttribute) => {
    setListProductAttributeNew([
      ...listroductAttributeNew,
      { ...value, id: listroductAttributeNew.length },
    ])
  }

  const deleteProductAttribute = (id: number) => {
    const listAttributes = productUpdate?.attributes.filter(
      (item) => item.id !== id
    )
    setProductUpdate((prev: IProduct) => ({
      ...prev,
      attributes: listAttributes,
    }))
    setAttributesDelete([...attributesDelete, id])
  }

  const deleteProductAttributeNew = (id: number) => {
    const listAttributes = listroductAttributeNew?.filter(
      (item) => item.id !== id
    )
    setListProductAttributeNew(listAttributes)
  }

  const updateProductAttribute = (data: IProductAttribute) => {
    const checkItem = productUpdate.attributes.find(
      (item) => item.id === data.id
    )
    if (JSON.stringify(checkItem) === JSON.stringify(data)) return
    const newList = listroductAttributeUpdate.map((item) => {
      if (item.id === data.id) {
        return data
      }
      return item
    })
    setListProductAttributeUpdate(newList)
  }

  const updateProductAttributeNew = (data: IProductAttribute) => {
    const newList = listroductAttributeNew.map((item) => {
      if (item.id === data.id) {
        return data
      }
      return item
    })
    setListProductAttributeNew(newList)
  }

  const onSubmit = async (data: TProductValidator) => {
    if (!productUpdate.attributes.length && !listroductAttributeNew.length) {
      return toast.error('Bạn chưa thêm các phân loại của sản phẩm.')
    }
    const formData = new FormData()
    formData.append('brand', data.brand)
    formData.append('detail', data.detail)
    formData.append('name', data.name)
    formData.append('price', data.price.toString())
    for (let i = 0; i < files.length; i++) {
      formData.append('pictureNew', files[i])
    }
    formData.append('pictureDelete', JSON.stringify(imagesDelete))
    let newList = productUpdate.attributes
    for (let index = 0; index < listroductAttributeUpdate.length; index++) {
      if (!listroductAttributeUpdate[index]) return
      newList = productUpdate.attributes.filter(
        (item) => item.id !== listroductAttributeUpdate[index].id
      )
    }
    formData.append('attributes', JSON.stringify(newList))
    formData.append(
      'attributesDelete',
      JSON.stringify(productUpdate.attributes)
    )
    formData.append('attributesNew', JSON.stringify(listroductAttributeNew))
    for (let i = 0; i < listroductAttributeNew.length; i++) {
      formData.append('attribute', listroductAttributeNew[i].file)
    }
    formData.append(
      'attributesUpdate',
      JSON.stringify(listroductAttributeUpdate)
    )
    for (let i = 0; i < listroductAttributeUpdate.length; i++) {
      formData.append('attributeUpdate', listroductAttributeUpdate[i].file)
    }
    setLoading(true)
    const res = await updateProduct(product.id, formData)
    setLoading(false)
    if (res.error) {
      return toast.error(res.message)
    }
    return toast.success('Cập nhật sản phẩm thành công.')
  }

  const handleSetBrand = (value: string) => {
    setValue('brand', value)
    trigger('brand')
  }

  const handleDeleteImageNew = (index: number, item: string) => {
    const newFileList = files
    newFileList.splice(index, 1)
    setImages(images.filter((image) => image !== item))
    setFiles((files) => [...newFileList])
  }

  const handleDeleteImage = (image: IProductImage) => {
    const listPicture = productUpdate?.picture.filter(
      (item) => item.id !== image.id
    )
    setProductUpdate((prev) => ({ ...prev, picture: listPicture }))
    setImagesDelete((prev) => [...prev, image.id])
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {isLoading ? <Loading /> : null}
      <form
        className="flex-1 p-4 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-lg font-medium">Thêm sản phẩm mới</h1>
        {/* Product */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Tên sản phẩm</Label>
          <Input
            type="text"
            {...register('name')}
            defaultValue={product.name}
            className={cn({
              'focus-visible:ring-red-500': errors.name,
            })}
          />
          {errors?.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col sm:grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="brand">Danh mục</Label>
            <Select
              onValueChange={(value) => handleSetBrand(value)}
              defaultValue={product.brand}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Danh mục"
                  color={'text-destructive'}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Thời trang">Thời trang</SelectItem>
                  <SelectItem value="Giày dép">Giày dép</SelectItem>
                  <SelectItem value="Sách">Sách</SelectItem>
                  <SelectItem value="Thiết bị điện tử">
                    Thiết bị điện tử
                  </SelectItem>
                  <SelectItem value="Sắc đẹp">Sắc đẹp</SelectItem>
                  <SelectItem value="Sức khỏe">Sức khỏe</SelectItem>
                  <SelectItem value="Đồ chơi">Đồ chơi</SelectItem>
                  <SelectItem value="Chăm sóc thú cưng">
                    Chăm sóc thú cưng
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors?.brand && (
              <p className="text-sm text-red-500">{errors.brand.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Giá sản phẩm</Label>
            <Input
              type="number"
              {...register('price', {
                setValueAs: (value) => Number(value),
              })}
              defaultValue={product.price}
              className={cn({
                'focus-visible:ring-red-500': errors.price,
              })}
            />
            {errors?.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="isPublish">Trạng thái</Label>
            <Select
              onValueChange={(value) => handleSetBrand(value)}
              defaultValue={product.isPublish ? 'publish' : 'unpublish'}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Trạng thái"
                  color={'text-destructive'}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="publish">Active</SelectItem>
                  <SelectItem value="unpublish">UnActive</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="sold">Sản phẩm đã bán</Label>
            <Input
              type="number"
              disabled
              defaultValue={product.sold}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="picture">Ảnh</Label>
          <Input
            type="file"
            {...register('picture')}
            className="hidden"
            ref={thumbProduct}
            multiple
            onChange={handleUploadThumb}
            onClick={(e) => (e.target.value = null)}
          />
          <div className="flex flex-wrap gap-2">
            <div
              className="lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 rounded-md shadow-lg relative"
              onClick={onUploadThumb}
            >
              <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            {productUpdate.picture?.map((item: IProductImage) => (
              <div
                key={item.id}
                className="relative lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 border rounded-md overflow-hidden"
              >
                <Image
                  alt="thumb"
                  src={item.product_thumb}
                  fill
                />
                <div
                  onClick={() => handleDeleteImage(item)}
                  className="absolute cursor-pointer top-0 left-0 hover:bg-gray-200/10 hover:text-background/80 text-transparent w-full h-full"
                >
                  <Delete
                    size={32}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
            ))}
            {images?.map((item: string, index: number) => (
              <div
                key={index}
                className="relative lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 border rounded-md overflow-hidden"
              >
                <Image
                  alt="thumb"
                  src={item}
                  fill
                />
                <div
                  onClick={() => handleDeleteImageNew(index, item)}
                  className="absolute cursor-pointer top-0 left-0 hover:bg-gray-200/10 hover:text-background/80 text-transparent w-full h-full"
                >
                  <Delete
                    size={32}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data={productUpdate.detail}
          onReady={() => {
            register('detail')
            setValue('detail', productUpdate.detail)
          }}
          onChange={(event, editor) => {
            const data = editor.getData()
            setValue('detail', data)
          }}
        />
        {errors?.detail && (
          <p className="text-sm text-red-500">{errors.detail.message}</p>
        )}
      </form>
      {/* Product Attribute */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-lg font-medium">Phân loại sản phẩm</h1>
        {productUpdate.attributes?.map((item) => (
          <ProductAttribute
            key={item.id}
            productAttribute={item}
            deleteProductAttribute={deleteProductAttribute}
            updateProductAttribute={updateProductAttribute}
          />
        ))}
        {listroductAttributeNew?.map((item) => (
          <ProductAttributeNew
            key={item.id}
            productAttribute={item}
            deleteProductAttributeNew={deleteProductAttributeNew}
            updateProductAttributeNew={updateProductAttributeNew}
          />
        ))}
        <FormAddProductAttribute
          handleAddProductAttribute={handleAddProductAttribute}
          listroductAttribute={productUpdate.attributes}
          listroductAttributeNew={listroductAttributeNew}
        />
      </div>
      <Button
        type="submit"
        // disabled={Object.keys(errors).length ? true : false}
        onClick={handleSubmit(onSubmit)}
      >
        Tạo sản phẩm
      </Button>
    </div>
  )
}

export default Product
