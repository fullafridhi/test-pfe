'use client'

import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import {API_URL} from '@/server';
import {setAuthUser} from '@/store/authSlice';
import axios from 'axios'
import { Avatar, AvatarFallback} from '@/components/ui/avatar'
import { toast } from 'sonner';

const HomePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  
  const logoutHandler = async()=>{
    await axios.post(`${API_URL}/users/logout`);
    dispatch(setAuthUser(null))
    toast.success('Logout successful')
  

  };
  
  return (
    <div className='h-[12vh] shadow-md' >
<div className='w-[80%]mx-auto flex items-center justify-between h-full'>
<h1 className='text-3xl font-bold uppercase'>Logo</h1>

{! user&& <Link href={'/auth/signup'}><Button size={'lg'}>Registre</Button> </Link>}

{user && <div className='flex items-center space-x-2'>
  <Avatar onClick={logoutHandler} className='cursor-pointer'>
  <AvatarFallback className='font-bold uppercase'>
    {user.username.split('')[0]}
  </AvatarFallback>
  </Avatar>
  <Button>Dashboard</Button>
  <Button variant={'ghost'}size={'sm'}>
    {user.isVerified ? 'Verifeid':'Not Verified'}
  </Button>
</div> }
</div>
<div className='flex items-center justify-center h-[80vh tsxt-5xl font-bold'>Home Page</div>



<div>
      <h1>Welcome to the Course Management System</h1>
      <nav>
      
        <Link href="/courses">View Courses</Link>
        ............
        <Link href="/courses/add">Add Course</Link>
        {user && user.role === 'admin' && ( // Check if the user is an admin
            <Link href="/videos">Manage Videos</Link>
          )}
      </nav>
    </div>

    </div>
    
  )
}

export default HomePage
