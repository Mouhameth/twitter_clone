"use client";
import Header from '@/components/Header'
import Postfeed from '@/components/Postfeed';
import UserBio from '@/components/users/UserBio';
import UserHero from '@/components/users/UserHero';
import useUser from '@/hooks/useUser';
import { ClipLoader } from 'react-spinners';

export const dynamicParams = true;

type PropTypes = {
    params: {
      userId: string
    }
  }
const page = ({params: {userId}}:PropTypes) => {
     console.log(userId);
     
    const {data: fetchUser, isLoading} = useUser(userId as string);

    if(isLoading || !fetchUser){
        return(
            <div className=' flex justify-center items-center h-full'>
                <ClipLoader color='lightblue' size={80} />
            </div>
        )
    }
  return (
    <>
    <Header showBackArrow label={fetchUser.name} />
    <UserHero userId = {userId as string} />
    <UserBio userId= {userId as string}/>
    <Postfeed/>
    </>
  )
}

export default page