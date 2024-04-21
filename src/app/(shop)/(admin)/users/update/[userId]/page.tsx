import React from 'react'
import FormUpdate from './FormUpdate'
import { getProfileUser } from '@/utils/actions/user'

const Page = async ({ params }: { params: { userId: string } }) => {
  const response = await getProfileUser(params.userId)
  if (response.error) throw new Error(response.message)
  return <FormUpdate user={response} />
}

export default Page
