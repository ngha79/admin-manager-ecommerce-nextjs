'use server'

import { getSession } from './account'

export const getListOrders = async ({
  page,
  limit,
  search,
  status,
}: {
  page: number
  limit: number
  search: string
  status: string
}) => {
  try {
    const session = await getSession()
    let url = ''
    if (search) url += `&search=${search}`
    if (status) url += `&status=${status}`
    const response = await fetch(
      `http://localhost:8000/list-orders/shop-list?page=${page}&limit=${limit}&shopId=${session.userId}` +
        url,
      {
        method: 'GET',
        headers: {
          userid: session.userId,
          Authorization: `Bearer ${session.accessToken}`,
          'Content-type': 'application/json',
        },
      }
    )
    const listOrders = await response.json()
    if (!response.ok) throw listOrders
    return listOrders
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1012 }
  }
}

export const updateOrder = async ({
  id,
  status,
}: {
  id: string
  status: string
}) => {
  try {
    const session = await getSession()
    const response = await fetch(`http://localhost:8000/list-orders/${id}`, {
      method: 'PUT',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })
    const update = await response.json()
    if (!response.ok) throw update
    return update
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1012 }
  }
}

export const getOrderById = async ({ id }: { id: string }) => {
  try {
    const session = await getSession()
    const response = await fetch(`http://localhost:8000/list-orders/${id}`, {
      method: 'GET',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
        'Content-type': 'application/json',
      },
    })
    const order = await response.json()
    if (!response.ok) throw order
    return order
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1012 }
  }
}
