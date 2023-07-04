"use client";
import Header from '@/components/Header'
import NotificationFeed from '@/components/NotificationFeed';

const page = () => {
 
  return (
    <>
      < Header label='Notifications' showBackArrow/>
      < NotificationFeed />
    </>
  )
}

export default page