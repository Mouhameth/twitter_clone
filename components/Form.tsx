import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePost";

interface FormProps{
    placeholder: string;
    isComment?: boolean;
    postId: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId}) => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const {data: currentUser} = useCurrentUser();
    const {mutate: mutatePosts} = usePosts();
    const {mutate: mutatePost} = usePost(postId as string);

    const [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback( async() =>{
        try {
            
            setIsLoading(true);

            const url = isComment? `/api/comment?postId=${postId}`: '/api/posts';
  
            await axios.post(url, {body});

            toast.success('Tweet created')

            setBody('');
            mutatePosts();
            mutatePost();
        } catch (error) {
            toast.error('something went wrong');
        }finally{
            setIsLoading(false);
        }
    },[body,mutatePosts, isComment, postId]);

  return (
    <div className=" border-b-[1px] border-neutral-100 px-5 py-2">
        {
            currentUser? ( 
            <div className="flex flex-row gap-4">
                <div className="">
                    <Avatar userId={currentUser?.id} />
                </div>
                <div className=" w-full">
                    <textarea 
                    disabled={isLoading} 
                    onChange={(event) => setBody(event.target.value)}
                    value={body}
                    className="
                     disabled:opacity-80
                     peer
                     resize-none
                     mt-3
                     w-full
                     ring-0
                     outline-none
                     text-[20px]
                   placeholder-neutral-500
                   text-black" 
                   placeholder={placeholder} ></textarea>
                   <hr className=" opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-100 transition" />
                   <div className="flex mt-4 flex-row justify-end"> 
                     < Button label="Tweet" disabled={isLoading || !body} onClick={onSubmit} />
                   </div>
                </div>
            </div> ):
            (
                <div className=" py-8">
                    <h1 className=" text-white text-2xl text-center mb-4 font-bold">
                        Welcome to Twitter
                    </h1>
                    <div className=" flex flex-row items-center justify-center gap-4">
                        < Button label="Login" onClick={loginModal.onOpen}/>
                        < Button label="Register" onClick={registerModal.onOpen}/>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Form