import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectBrand {
  brand: string
  handleSetBrand: (sort: string, orderBy?: string) => void
}

export function SelectBrand({ brand, handleSetBrand }: SelectBrand) {
  const [brandSearch, setBrandSearch] = React.useState<string>('')

  const handleUpdate = (type: string) => {
    handleSetBrand(type.toLowerCase())
    setBrandSearch(type)
  }

  return (
    <Select
      onValueChange={(value) => handleUpdate(value)}
      value={brandSearch}
    >
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder="Danh mục"
          color={'text-destructive'}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="FASHION">Thời trang</SelectItem>
          <SelectItem value="FOOTWEAR">Giày dép</SelectItem>
          <SelectItem value="BOOKS">Sách</SelectItem>
          <SelectItem value="ELECTRONICS">Thiết bị điện tử</SelectItem>
          <SelectItem value="BEAUTY">Sắc đẹp</SelectItem>
          <SelectItem value="HEALTH">Sức khỏe</SelectItem>
          <SelectItem value="TOYS">Đồ chơi</SelectItem>
          <SelectItem value="PETCARE">Chăm sóc thú cưng</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
