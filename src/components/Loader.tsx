import { Loader2 } from 'lucide-react'

const Loader = () => {
  return (
    <div className="flex flex-1 justify-center items-center h-full">
      <Loader2 className="mr-2 h-12 w-12 animate-spin" />
    </div>
  )
}

export default Loader
