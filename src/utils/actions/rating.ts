'use server'

import { getSession } from './account'

export async function getRatingShop() {
  try {
    const session = await getSession()
    const res = await fetch(
      `http://localhost:8000/comment-product/${session.userId}`,
      {
        method: 'PUT',
        headers: {
          userid: session.userId,
          Authorization: `Bearer ${session.accessToken}`,
          'Content-type': 'application/json',
        },
        cache: 'no-cache',
      }
    )
    const rating = await res.json()
    if (!res.ok) throw rating
    return rating
  } catch (error: any) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1234 }
  }
}

export async function getListRating({
  limit,
  page,
  shopId,
  order,
  productId,
  rating,
}: {
  limit: number
  page: number
  shopId?: string
  order?: string
  productId?: string
  rating?: number
}) {
  try {
    let url = ''
    if (shopId) url = url.concat(`&shopId=${shopId}`)
    if (order) url = url.concat(`&order=${order}`)
    if (productId) url = url.concat(`&productId=${productId}`)
    if (rating) url = url.concat(`&rating=${rating}`)
    const res = await fetch(
      `http://localhost:8000/comment-product?limit=${limit}&page=${page}` + url,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
        cache: 'no-cache',
      }
    )
    const list = await res.json()
    if (!res.ok) throw list
    return list
  } catch (error: any) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1234 }
  }
}

export const createCommentReplyUser = async (formData: any) => {
  try {
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/shop-comment-product`, {
      method: 'POST',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: 'no-cache',
      body: formData,
    })
    const reply = await res.json()
    if (!res.ok) throw reply
    return reply
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1234 }
  }
}
