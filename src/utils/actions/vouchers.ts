import { getSession } from './account'

export const getListVoucherShop = async ({
  page = 1,
  limit,
  search = '',
  isActive,
}: any) => {
  const session = await getSession()
  let url = ''
  if (isActive) url += `&isActive=${isActive}`
  const response = await fetch(
    `http://localhost:8000/discounts?page=${page}&limit=${limit}&search=${search}&shopId=${session.userId}` +
      url,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    }
  )
  return response.json()
}

export const getVoucher = async (id: string) => {
  const response = await fetch(`http://localhost:8000/discounts/${id}`, {
    method: 'GET',
    cache: 'no-cache',
  })
  return response.json()
}

export const updateVoucher = async (id: string, formData: any) => {
  const response = await fetch(`http://localhost:8000/discounts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}

export const createVoucher = async (formData: any) => {
  const session = await getSession()
  const response = await fetch(`http://localhost:8000/discounts`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      userid: session.userId,
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}

export const deleteVoucher = async (id: string) => {
  const response = await fetch(`http://localhost:8000/discounts/${id}`, {
    method: 'DELETE',
  })

  return response.json()
}
