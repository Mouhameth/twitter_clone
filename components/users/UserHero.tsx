import useUser from "@/hooks/useUser"
import Avatar from "../Avatar"
import Image from "next/image";

interface UserHeroProps{
    userId: string
}

const UserHero: React.FC<UserHeroProps> = ({userId}) => {
  const {data: fetchUser} = useUser(userId);
 console.log(fetchUser);
 
  return (
    <div className=" bg-neutral-700 h-44 relative">
        { fetchUser?.coneredImage && (
        <Image src={fetchUser.coneredImage}
               fill 
               alt="CoverImage" 
               style={{objectFit:'cover'}}
        />
        )}
        <div className=" absolute -bottom-16 left-4">
            < Avatar userId={userId} isLarge hasBorder />
        </div>

    </div>
  )
}

export default UserHero