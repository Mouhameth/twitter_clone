
import { BsTwitter } from "react-icons/bs"

const SidebarLogo = () => {


  return (
    <div className="
    rounded-full
    h-14
    w-14
    p-4
    flex
    items-center
    justify-center
  hover:bg-blue-300
    hover:bg-opacity-5
    cursor-pointer
    transition
    ">
      <BsTwitter size={28} className=" text-sky-500" />
    </div>
  )
}

export default SidebarLogo