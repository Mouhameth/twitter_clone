import useRegisterModal from '@/hooks/useRegisterModal';
import React, { useCallback, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import useLoginModal from '@/hooks/useLoginModal';
import axios from "axios"
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [lodading, setLodading] = useState(false)

    const onToggle = useCallback(() =>{
        if(lodading) return;

        registerModal.onClose();
        loginModal.onOpen();
    },[lodading, registerModal, loginModal]);
  
    const onSubmit = useCallback(async() => {
       try{
          setLodading(true);

          await axios.post('/api/register', {email, password,username, name});

          toast.success('Account created!')

          signIn('credentials',{email, password});
  
          registerModal.onClose();
       }
       catch(error){
        toast.error('Something went wrong!')
       }
       finally{
        setLodading(false);
       }
    },[registerModal, email, password, username, name]);
  
    const bodyContent = (
      <div className=" flex flex-col gap-4">
          <Input 
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          value={email}
          disabled={lodading} />

          <Input 
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          value={name}
          disabled={lodading} />

          <Input 
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          value={username}
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
                Already have an account?
                <span onClick={onToggle} className=" text-sky-500 cursor-pointer hover:underline"> Sign in</span>
            </p>
        </div>
    )

    return (
        <Modal 
        onClose={registerModal.onClose} 
        onSubmit={onSubmit} 
        actionLabel='Sign up'
        title='Create an account'
        isOpen={registerModal.isOpen}
        disabled={lodading}
        body={bodyContent}
        footer={footerContent}
         />
    )
}

export default RegisterModal