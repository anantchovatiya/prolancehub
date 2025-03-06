"use client";
import React from 'react'
import Freelancer from '@/Components/Freelancer';
import ClientProfile from '@/Components/Client';
import { useSession } from 'next-auth/react';
import Loading from '@/Components/Loading';

const page =  () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Loading/>
  }

  if (!session) {
    return <div>You are not logged in.</div>; // Handle no session state
  }

  const r = session.user.role || 'freelancer'; // Use the role from session if available
  if(r === 'freelancer'){
    return <Freelancer />
  }
  else if(r === 'employer'){
    // return <div>Client</div>
    return <ClientProfile />
  }
  else{
    return <div>404</div>
  }

}
export default page;