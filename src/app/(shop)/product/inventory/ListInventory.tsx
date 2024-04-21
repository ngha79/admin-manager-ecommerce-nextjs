'use client'

import { useState } from 'react'
import Inventory from './Inventory'

interface IInventory {
  id: number
  stock: number
  createdAt: Date
  updatedAt: Date
  productAttribute: any
  product: {
    name: string
    brand: string
    picture: any
  }
}

interface IListInventory {
  data: IInventory[]
  lastPage: number
  nextPage: number | null
  prevPage: number | null
}

const ListInventory = ({
  listInventory,
}: {
  listInventory: IListInventory
}) => {
  const [Inventories, setInventories] = useState(listInventory.data)

  const handleUpdate = (id: number, stock: number) => {
    setInventories(
      Inventories.map((item) => {
        if (item.id === id) {
          item.stock = stock
        }
        return item
      })
    )
  }

  return (
    <div className="flex flex-col gap-8 max-sm:p-2 p-4">
      <div className="max-sm:w-vw overflow-x-scroll w-full">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="lg:text-lg text-gray-700 bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Sản phẩm
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center"
              >
                Tổng sản phẩm
              </th>
              <th
                scope="col"
                className="px-6 py-3"
              >
                Kích cỡ
              </th>
              <th
                scope="col"
                className="px-6 py-3 md:flex hidden"
              >
                Chất liệu
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {listInventory?.data?.map((item) => (
              <Inventory
                Inventory={item}
                key={item.id}
                handleUpdate={handleUpdate}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListInventory
