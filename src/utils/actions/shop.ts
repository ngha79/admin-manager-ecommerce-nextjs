'use server'

import { getSession } from './account'

export const profileShop = async () => {
  try {
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/shop/profile`, {
      method: 'PUT',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
        'Content-type': 'application/json',
      },
    })
    const profile = await res.json()
    if (!res.ok) throw profile
    return profile
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1421 }
  }
}

export const updateProfileShop = async (data: any) => {
  try {
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/shop`, {
      method: 'PUT',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const profile = await res.json()
    if (!res.ok) throw profile
    return profile
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1421 }
  }
}

export const updateAvatarShop = async (form: any) => {
  try {
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/shop/avatar`, {
      method: 'POST',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: form,
    })
    const avatar = await res.json()
    if (!res.ok) throw avatar
    return avatar
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1421 }
  }
}

export const updateBackgroundShop = async (form: any) => {
  try {
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/shop/background`, {
      method: 'POST',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: form,
    })
    const background = await res.json()
    if (!res.ok) throw background
    return background
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1421 }
  }
}

export const getListShops = async ({
  page,
  limit,
  search,
  isActive,
  order,
}: {
  page: number
  limit: number
  search: string
  isActive?: string
  order?: string
}) => {
  try {
    let url = `?limit=${limit}&page=${page}&search=${search}`
    if (isActive) url += `&isActive=${isActive}`
    if (order) url += `&order=${order}`
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/shop` + url, {
      method: 'GET',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
        'Content-type': 'application/json',
      },
      cache: 'no-cache',
    })
    const listShops = await res.json()
    if (!res.ok) throw listShops
    return listShops
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1421 }
  }
}

export const updateStatusShop = async (data: any) => {
  try {
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/shop/status`, {
      method: 'PUT',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const listShops = await res.json()
    if (!res.ok) throw listShops
    return listShops
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1421 }
  }
}

export const deleteShop = async (shopId: string) => {
  try {
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/shop/${shopId}`, {
      method: 'DELETE',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
        'Content-type': 'application/json',
      },
    })
    const listShops = await res.json()
    if (!res.ok) throw listShops
    return listShops
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1421 }
  }
}

export const createShop = async (formData: FormData) => {
  try {
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/shop/admin`, {
      method: 'POST',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    })
    const newShop = await res.json()
    if (!res.ok) throw newShop
    return newShop
  } catch (error) {
    return { message: error.message, error: 1421 }
  }
}

export const getProfileShop = async (shopId: string) => {
  try {
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/shop/${shopId}`, {
      method: 'GET',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    const profileShop = await res.json()
    if (!res.ok) throw profileShop
    return profileShop
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1421 }
  }
}

export const updateProfileShopByAdmin = async (
  userId: string,
  formData: any
) => {
  try {
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/shop/admin/${userId}`, {
      method: 'PUT',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    })
    const users = await res.json()
    if (!res.ok) throw users
    return users
  } catch (error) {
    if (error.message) {
      return error
    }
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1421 }
  }
}

export const changePasswordShop = async (data: any) => {
  try {
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/shop/change-password`, {
      method: 'PUT',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const changePassword = await res.json()
    if (!res.ok) throw changePassword
    return changePassword
  } catch (error) {
    return { message: error.message, error: 1421 }
  }
}

export const changePasswordShopLogin = async (data: any) => {
  try {
    const res = await fetch(
      `http://localhost:8000/shop/change-password-login`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
    const forgotPassword = await res.json()
    if (!res.ok) throw forgotPassword
    return forgotPassword
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1421 }
  }
}
