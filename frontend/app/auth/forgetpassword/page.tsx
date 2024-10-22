'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API_URL } from '@/server';

const fogetPassword = () => {
    const [email,setEmail]= useState('');
    const [loading,setLoading]=useState(false)
    const router = useRouter()

    const handleSubmit = async()=>{
        setLoading(true)
        try {
            await axios.post(`${API_URL}/users/forget-password`, { email }, { withCredentials: true });
            toast.success('Reset code sent to your email');
            router.push(`/auth/resetpassword?email=${encodeURIComponent(email)}`);
          } catch (error: any) {
            toast.error(error.response?.data?.message || 'An error occurred');
          } finally {
            setLoading(false);
          }
        };

  return (
    <div className='w-full h-screen flex items-center justify-center flex-col'>
      <h1 className='text-xl text-gray-900 mb-4 font-medium'>Enter your email to get code for reset password </h1>
    <input
     type='email'
     value={email}
     onChange={(e)=>setEmail(e.target.value)}
     className='bock w-[40%] mb-4 max-auto rounded=lg bg-gray-300 px-4 py-3  '/>
  {!loading && <Button onClick={handleSubmit}>Submit</Button>}
  {loading && < Button>
  <Loader className='animate-spin'/>
  </Button> }

    </div>
  )
}

export default fogetPassword
