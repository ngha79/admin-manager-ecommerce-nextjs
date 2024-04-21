import Navbar from '@/components/navbar/Navbar'
import SideBar from '@/components/sidebar/SideBar'
import { getSession } from '@/utils/actions/account'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  } else {
    redirect('/profile')
  }
  return null
}
