'use server'

import { IAuthLoginCredentialsValidator } from '@/lib/validators/account-credentials-validator'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function login(formData: IAuthLoginCredentialsValidator) {
  try {
    const res = await fetch('http://localhost:8000/auth/shop/login', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const account = await res.json()
    if (!res.ok) throw account
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    cookies().set('session', JSON.stringify(account), {
      expires,
      httpOnly: true,
    })
    return account
  } catch (error: any) {
    return error
  }
}

export async function logout() {
  cookies().set('session', '', { expires: new Date(0) })
}

export async function getSession() {
  const session = cookies().get('session')?.value
  if (!session) return null
  return await decrypt(session)
}

export async function decrypt(session: string) {
  return await JSON.parse(session)
}

export async function encrypt(session: string) {
  return await JSON.stringify(session)
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  if (!session) return

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session)
  parsed.expires = new Date(Date.now() + 10 * 1000)
  const res = NextResponse.next()
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  })
  return res
}
