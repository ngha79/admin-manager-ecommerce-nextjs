'use server'

import { BrandProduct } from '@/lib/interface'
import { getSession } from './account'

export async function createProduct(formData: any) {
  try {
    const session = await getSession()
    const res = await fetch('http://localhost:8000/product/', {
      method: 'POST',
      body: formData,
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    const account = await res.json()
    if (!res.ok) throw account
    return account
  } catch (error: any) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1234 }
  }
}

export const getListProduct = async ({
  page = 1,
  limit = 10,
  search = '',
  brand,
  order,
  publish,
  searchBy,
}: {
  page: number
  limit: number
  search: string
  brand?: BrandProduct
  publish?: boolean
  order?: 'ASC' | 'DESC'
  searchBy?: 'ctime' | 'price' | 'sales'
}) => {
  try {
    let url = ''
    const session = await getSession()
    if (brand) url = url.concat(`&brand=${brand}`)
    if (searchBy) url = url.concat(`&searchBy=${searchBy}`)
    if (order) url = url.concat(`&order=${order}`)
    if (publish) url = url.concat(`&publish=${publish}`)
    const res = await fetch(
      `http://localhost:8000/product/shop/list?page=${page}&shopId=${session.userId}&limit=${limit}&search=${search}` +
        url,
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
    const products = await res.json()
    if (!res.ok) throw products
    return products
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1101 }
  }
}

export const deleteProduct = async ({ productId }: { productId: string }) => {
  try {
    const session = await getSession()

    const res = await fetch(`http://localhost:8000/product/${productId}`, {
      method: 'DELETE',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
        'Content-type': 'application/json',
      },
      cache: 'no-cache',
    })
    const products = await res.json()
    if (!res.ok) throw products
    return products
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1101 }
  }
}

export const publishProducts = async (data: { productIds: string[] }) => {
  try {
    const session = await getSession()
    const res = await fetch('http://localhost:8000/product/publish', {
      method: 'PATCH',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const products = await res.json()
    if (!res.ok) throw products
    return products
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1101 }
  }
}

export const unpublishProducts = async (data: { productIds: string[] }) => {
  try {
    const session = await getSession()

    const res = await fetch('http://localhost:8000/product/unpublish', {
      method: 'PATCH',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const products = await res.json()
    if (!res.ok) throw products
    return products
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1101 }
  }
}

export const getProductById = async (productId: string) => {
  try {
    const session = await getSession()

    const res = await fetch(`http://localhost:8000/product/info/${productId}`, {
      method: 'GET',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
        'Content-type': 'application/json',
      },
      cache: 'no-cache',
    })
    const product = await res.json()
    if (!res.ok) throw product
    return product
  } catch (error) {
    return {
      message: 'Có lỗi xảy ra vui lòng thử lại sau.',
      error: error.statusCode,
    }
  }
}

export const updateProduct = async (productId: string, data: any) => {
  try {
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/product/${productId}`, {
      method: 'PUT',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: data,
    })
    const product = await res.json()
    if (!res.ok) throw product
    return product
  } catch (error) {
    return {
      message: 'Có lỗi xảy ra vui lòng thử lại sau.',
      error: error.statusCode,
    }
  }
}
