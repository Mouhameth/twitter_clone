"use client";
import Form from '@/components/Form';
import Header from '@/components/Header'
import Postfeed from '@/components/Postfeed';

export default function Home() {
  return (
    <main className=" ">
       <Header label="Home" />
       <Form placeholder="What's happening?" postId={''} />
       <Postfeed/>
    </main>
  )
}
