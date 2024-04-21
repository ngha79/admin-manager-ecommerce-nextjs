import { Plus, Delete, Trash, SquarePen, X, Check } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface IProductAttribute {
  material: string
  size: string
  thumb: string
  file: File
  id: number
}

const ProductAttributeNew = ({
  productAttribute,
  deleteProductAttributeNew,
  updateProductAttributeNew,
}: {
  productAttribute: IProductAttribute
  deleteProductAttributeNew: (id: number) => void
  updateProductAttributeNew: (productAttribute: IProductAttribute) => void
}) => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const thumbProduct = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string>('')
  const [attribute, setAttribute] = useState<any>({
    size: productAttribute.size,
    material: productAttribute.material,
    thumb: productAttribute.thumb,
    id: productAttribute.id,
    file: null,
  })
  const onUploadThumb = () => {
    thumbProduct?.current?.click()
  }

  const handleUploadThumb = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = URL.createObjectURL(e.target.files[0])
      setImage(image)
      setAttribute((prev: any) => ({ ...prev, file: e.target.files?.[0] }))
    }
  }
  const handleDelete = () => {
    deleteProductAttributeNew(productAttribute.id)
  }

  const handleUpdate = () => {
    if (!attribute.file && !attribute.thumb)
      return toast.error('Phải có ít nhất 1 ảnh.')
    setIsUpdate(false)
    updateProductAttributeNew(attribute)
  }

  const handleOnChange = (e: { target: { name: any; value: any } }) => {
    setAttribute((attribute: any) => ({
      ...attribute,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCancel = () => {
    setAttribute({
      size: productAttribute.size,
      material: productAttribute.material,
      thumb: productAttribute.thumb,
      id: productAttribute.id,
      file: productAttribute.file,
    })
    setIsUpdate(false)
    setImage('')
  }

  const handleDeleteThumbDefault = () => {
    setAttribute((attribute: any) => ({
      ...attribute,
      thumb: null,
    }))
  }

  const handleDeleteThumbNew = () => {
    setAttribute((attribute: any) => ({
      ...attribute,
      file: null,
    }))
    setImage('')
  }

  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="size">Kích cỡ</Label>
          <Input
            type="text"
            name="size"
            id="size"
            value={attribute.size}
            disabled={!isUpdate}
            onChange={handleOnChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="material">Màu sắc, chất liệu...</Label>
          <Input
            type="text"
            name="material"
            value={attribute.material}
            disabled={!isUpdate}
            id="material"
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="thumb">Ảnh</Label>
        <Input
          type="file"
          className="hidden"
          ref={thumbProduct}
          multiple
          onChange={handleUploadThumb}
        />
        <div className="flex flex-wrap gap-2">
          {isUpdate && (
            <div
              className="lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 cursor-pointer text-blue-300 bg-gray-50 hover:bg-background hover:text-blue-500 rounded-md shadow-lg relative"
              onClick={onUploadThumb}
            >
              <Plus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          )}

          {attribute.thumb && (
            <div className="relative lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 border rounded-md overflow-hidden">
              <Image
                alt="thumb"
                src={attribute.thumb}
                fill
              />
              {isUpdate && (
                <div
                  onClick={handleDeleteThumbDefault}
                  className="absolute cursor-pointer top-0 left-0 hover:bg-gray-200/10 hover:text-background/80 text-transparent w-full h-full"
                >
                  <Delete
                    size={32}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              )}
            </div>
          )}
          {image && (
            <div className="relative lg:w-64 md:w-52 md:h-40 w-40 lg:h-48 h-32 border rounded-md overflow-hidden">
              <Image
                alt="thumb"
                src={image}
                fill
              />
              {isUpdate && (
                <div
                  onClick={handleDeleteThumbNew}
                  className="absolute cursor-pointer top-0 left-0 hover:bg-gray-200/10 hover:text-background/80 text-transparent w-full h-full"
                >
                  <Delete
                    size={32}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 justify-end">
        {isUpdate ? (
          <>
            <Button
              className="flex items-center gap-2 w-max"
              variant={'destructive'}
              onClick={handleCancel}
            >
              <X size={18} />
              Hủy
            </Button>
            <Button
              className="flex items-center gap-2 w-max"
              variant={'success'}
              onClick={handleUpdate}
            >
              <Check size={18} />
              Xác nhận
            </Button>
          </>
        ) : (
          <>
            <Button
              className="flex items-center gap-2 w-max"
              variant={'destructive'}
              onClick={handleDelete}
            >
              <Trash size={18} />
              Xóa
            </Button>
            <Button
              className="flex items-center gap-2 w-max"
              onClick={() => setIsUpdate(true)}
            >
              <SquarePen size={18} />
              Sửa
            </Button>
          </>
        )}
      </div>
    </>
  )
}

export default ProductAttributeNew
