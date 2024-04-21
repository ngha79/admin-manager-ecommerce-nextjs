'use server'

import { getSession } from './account'

export const getListUsers = async ({
  page = 1,
  limit = 20,
  search = '',
}: {
  page: number
  limit: number
  search?: string
}) => {
  try {
    const session = await getSession()
    const res = await fetch(
      `http://localhost:8000/users?page=${page}&limit=${limit}&search=${search}`,
      {
        method: 'GET',
        headers: {
          userid: session.userId,
          Authorization: `Bearer ${session.accessToken}`,
        },
        cache: 'no-cache',
      }
    )
    const users = await res.json()
    if (!res.ok) throw users
    return users
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1421 }
  }
}

export const deleteUser = async ({ userId }: { userId: string }) => {
  try {
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/users/${userId}`, {
      method: 'DELETE',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
    const users = await res.json()
    if (!res.ok) throw users
    return users
  } catch (error) {
    return { message: 'Có lỗi xảy ra vui lòng thử lại sau.', error: 1421 }
  }
}

export const createUser = async (data: any) => {
  try {
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/users`, {
      method: 'POST',
      headers: {
        userid: session.userId,
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: data,
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

export const getProfileUser = async (userId: string) => {
  try {
    const res = await fetch(`http://localhost:8000/users/${userId}`, {
      method: 'GET',
      cache: 'no-cache',
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

export const updateProfileUserByAdmin = async (
  userId: string,
  formData: any
) => {
  try {
    const session = await getSession()
    const res = await fetch(`http://localhost:8000/users/${userId}`, {
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
