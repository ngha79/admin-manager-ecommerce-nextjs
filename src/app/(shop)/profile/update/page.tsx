import { profileShop } from '@/utils/actions/shop'
import DescriptionShop from '../_components/DescriptionShop'
import FormUpdateUser from '../_components/FormUpdateUser'
import ProfileUser from '../_components/ProfileUser'

const Page = async () => {
  const response = await profileShop()
  if (response.error) throw new Error(response.message)
  return (
    <div className="flex gap-4 p-4 w-full flex-col max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 w-full rounded-md shadow-sm">
        <ProfileUser
          avatar={response?.avatar}
          background={response?.background}
          userName={response?.userName}
          phoneNumber={response?.phoneNumber}
          email={response?.email}
          followers={response.followers}
          createdAt={response.createdAt}
        />
        <FormUpdateUser
          avatar={response?.avatar}
          background={response?.background}
          userName={response?.userName}
          phoneNumber={response?.phoneNumber}
          email={response?.email}
        />
      </div>
      <DescriptionShop description={response.description} />
    </div>
  )
}

export default Page
