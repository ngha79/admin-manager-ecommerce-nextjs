import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateStockProduct } from '@/utils/actions/inventory'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'

const Inventory = ({
  Inventory,
  handleUpdate,
}: {
  Inventory: any
  handleUpdate: (id: number, stock: number) => void
}) => {
  const [isUpdate, setUpdate] = useState<boolean>(false)
  const [stock, setStock] = useState<number>(Inventory.stock)

  const handeleUpdateInventory = async () => {
    if (stock > 0) {
      const response = await updateStockProduct({ id: Inventory.id, stock })
      if (response.error) return toast.error(response.message)
      setUpdate(false)
      handleUpdate(Inventory.id, stock)
      return toast.success('Cập nhật số lượng sản phẩm thành công')
    }
    return toast.error('Số lượng sản phẩm cập nhật không phù hợp')
  }

  const handleOnChange = (e) => {
    if (e.target.value < 0) return setStock(stock)
    setStock(Math.floor(e.target.value))
  }

  const handleCancel = () => {
    setStock(Inventory.stock)
    setUpdate(false)
  }

  return (
    <tr className="bg-white w-full even:bg-gray-50 border-b">
      <th
        scope="row"
        className="flex flex-col gap-2 px-6 py-4 font-medium text-gray-700 whitespace-nowrap dark:text-white"
      >
        <Image
          alt="image product"
          src={Inventory.productAttribute.thumb}
          width={120}
          height={80}
        />
        <span className="line-2">{Inventory.product.name}</span>
      </th>
      {isUpdate ? (
        <td className="p-2">
          <div className="flex justify-center">
            <Input
              type="number"
              value={stock}
              className="max-w-32 min-w-20 text-center"
              onChange={handleOnChange}
            />
          </div>
        </td>
      ) : (
        <td className="px-6 py-4 text-center">{Number(stock)}</td>
      )}
      <td className="px-6 py-4">{Inventory.productAttribute.size}</td>
      <td className="px-6 py-4 max-md:hidden">
        {Inventory.productAttribute.material}
      </td>
      <td className="px-6 py-4 text-center">
        {isUpdate ? (
          <div className="flex flex-col justify-center items-center sm:flex-row gap-2">
            <Button
              onClick={() => handleCancel()}
              variant={'destructive'}
            >
              Hủy
            </Button>
            <Button
              onClick={() => handeleUpdateInventory()}
              variant={'success'}
            >
              Cập nhật
            </Button>
          </div>
        ) : (
          <Button onClick={() => setUpdate(true)}>Edit</Button>
        )}
      </td>
    </tr>
  )
}

export default Inventory
