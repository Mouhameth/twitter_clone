import useCurrentUser from "@/hooks/useCurrentUser"
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";


const EditModal = () => {

    const {data: currentUser} = useCurrentUser();
    const { mutate: mutateFetchedUser} = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState('');
    const [coneredImage, setConeredImage] = useState('');

    useEffect(()=> {
      setImage(currentUser?.image);
      setConeredImage(currentUser?.coneredImage);
      setName(currentUser?.name);
      setUsername(currentUser?.username);
      setBio(currentUser?.bio);
    },[currentUser?.image, currentUser?.coneredImage, currentUser?.name, currentUser?.username, currentUser?.bio]);

    const [isLoading, setIsLoading]= useState(false);

    const onSubmit = useCallback( async ()=>{
        try{
            setIsLoading(true);
            await axios.patch('/api/edit', {
                name,username, bio,image, coneredImage
            });
            mutateFetchedUser();

            toast.success('Updated');

            editModal.onClose();
        }
        catch(error){
            toast.error('Something went wrong');
        }
        finally{
            setIsLoading(false);
        }
    },[name,username, bio,image, coneredImage, isLoading, mutateFetchedUser ]);

    const bodyContent = (
     <div className=" flex flex-col gap-4">
        <ImageUpload 
        value ={image}
        disabled={isLoading}
        onChange={(img) => setImage(img)}
        label="Upload the profile image" />

        <ImageUpload 
        value ={coneredImage}
        disabled={isLoading}
        onChange={(img) => setConeredImage(img)}
        label="Upload the cover image" />

        <Input 
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
        />

        <Input 
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
        />

        <Input 
        placeholder="bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
        />
     </div>
    );

  return (
    <Modal 
    disabled={isLoading} 
    isOpen={editModal.isOpen} 
    title="Edit your profile"
    actionLabel="Save"
    onClose={editModal.onClose}
    onSubmit={onSubmit}
    body={bodyContent} />
  )
}

export default EditModal