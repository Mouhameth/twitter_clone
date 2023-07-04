import useLoginModal from '@/hooks/useLoginModal'
import React, { useCallback, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRegisterModal';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

const LoginModal = () => {

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [lodading, setLodading] = useState(false)

  const onToggle = useCallback(() =>{
    if(lodading) return;

    loginModal.onClose();
    registerModal.onOpen();
},[lodading, registerModal, loginModal])

  const onSubmit = useCallback( async() => {
     try{
        setLodading(true);

        await signIn('credentials', {email, password})

        toast.success('logged in');

        loginModal.onClose();
     }
     catch(error){
        toast.error('something went wrong');
     }
     finally{
      setLodading(false);
     }
  },[loginModal, email, password]);

  const bodyContent = (
    <div className=" flex flex-col gap-4">
        <Input 
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        value={email}
        disabled={lodading} />

        <Input 
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
        type='password'
        value={password}
        disabled={lodading} />
    </div>
  )

  const footerContent = (
    <div className=' text-neutral-500 text-center my-4'>
        <p className="">
            First time using Twitter?
            <span onClick={onToggle} className=" text-sky-500 cursor-pointer hover:underline"> Create an account</span>
        </p>
    </div>
   )
  return (
      <Modal 
      onClose={loginModal.onClose} 
      onSubmit={onSubmit} 
      actionLabel='Sign in'
      title='Login'
      isOpen={loginModal.isOpen}
      disabled={lodading}
      body={bodyContent}
      footer={footerContent}
       />
  )
}

export default LoginModal