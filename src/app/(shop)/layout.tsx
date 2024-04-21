import Navbar from '@/components/navbar/Navbar'
import SideBar from '@/components/sidebar/SideBar'
import { getSession } from '@/utils/actions/account'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import Loader from '@/components/Loader'

const ShopLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession()
  if (!session) redirect('/login')
  return (
    <Suspense fallback={<Loader />}>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex overflow-hidden">
          <SideBar />
          {children}
        </div>
      </div>
    </Suspense>
  )
}

export default ShopLayout
