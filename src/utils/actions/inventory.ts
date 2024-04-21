'use server'

import { getSession } from './account'

export const getInventories = async ({
  page,
  limit,
}: {
  page: number
  limit: number
}) => {
  try {
    const session = await getSession()

    const res = await fetch(
      `http://localhost:8000/inventories?page=${page}&limit=${limit}&shopId=${session.userId}`,
      {
        method: 'GET',
        headers: {
          userid: session.userId,
          Authorization: `Bearer ${session.accessToken}`,
          'Content-type': 'application/json',
        },
        cache: 'no-cache',
      }
    )
    const inventories = await res.json()
    if (!res.ok) throw inventories
    return inventories
  } catch (error) {
    return {
      message: 'Có lỗi xảy ra vui lòng thử lại sau.',
      error: error.statusCode,
    }
  }
}

export const updateStockProduct = async ({
  id,
  stock,
}: {
  id: number
  stock: number
}) => {
  try {
    const session = await getSession()

    const res = await fetch(`http://localhost:8000/inventories/${id}`, {
      method: 'PATCH',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
        'Content-type': 'application/json',
      },
      cache: 'no-cache',
      body: JSON.stringify({ stock }),
    })
    const update = await res.json()
    if (!res.ok) throw update
    return update
  } catch (error) {
    return {
      message: 'Có lỗi xảy ra vui lòng thử lại sau.',
      error: error.statusCode,
    }
  }
}
