import { redirect } from 'next/navigation'

const Page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return redirect('/product/list')
  return null
}

export default Page
