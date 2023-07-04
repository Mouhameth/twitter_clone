"use client";
import CommentFeed from '@/components/CommentFeed';
import Form from '@/components/Form';
import Header from '@/components/Header';
import PostItem from '@/components/PostItem';
import usePost from '@/hooks/usePost';
import { useRouter } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

export const dynamicParams = true;

type PropTypes = {
    params: {
      postId: string
    }
  }

const page = ({params: {postId}}:PropTypes) => {
  const router = useRouter();  
  const { data: fetchedPost, isLoading} = usePost(postId as string);

   if( isLoading || !fetchedPost){
    return (
        <div className=" flex justify-center items-center h-full">
            <ClipLoader color='lightblue' size={80}/>
        </div>
    )
   }

  return (
    <>
    <Header label='Tweet' showBackArrow />
    <PostItem data={fetchedPost} userId={''}/>
    <Form placeholder="Tweet your reply" isComment postId={postId as string}/>
    < CommentFeed comments={ fetchedPost?.comments} />
    </>
  )
}

export default page