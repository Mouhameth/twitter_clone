"use client";
import Sidebar from '@/components/layout/Sidebar'
import './globals.css'
import { Inter } from 'next/font/google'
import FollowBar from '@/components/layout/FollowBar'
import RegisterModal from '@/components/modals/RegisterModal';
import LoginModal from '@/components/modals/LoginModal';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import EditModal from '@/components/modals/EditModal';

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
        <SessionProvider>
        <Toaster/>
        <RegisterModal/>
        <LoginModal/>
        <EditModal/>
        <div className={`${inter.className} h-screen bg-white`}>
        <div className=' container h-full mx-auto xl:px-30 max-w-6xl'>
          <div className="grid grid-cols-4 h-full">
            <Sidebar/>
            <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-100 overflow-scroll">
              {children}
            </div>
            <FollowBar/>
          </div>
        </div>
        </div>
        </SessionProvider>
      </body>
    </html>
  )
}
