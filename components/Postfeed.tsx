import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import useCurrentUser from "@/hooks/useCurrentUser";


const Postfeed = () => {
    const {data: currentUser} = useCurrentUser();
    
    const {data: posts = [] } = usePosts();
    
  return (
    <>
        {posts.map((post: Record<string, any>) =>(
            <PostItem userId={currentUser?.id} key={post.id} data={post} />
        ))}
    </>
  )
}

export default Postfeed