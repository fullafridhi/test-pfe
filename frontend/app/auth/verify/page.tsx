'use client'

import React,{ChangeEvent,KeyboardEvent,useEffect,useRef,useState } from 'react'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { API_URL } from '@/server';
import { Loader } from 'lucide-react';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { setAuthUser } from '@/store/authSlice';
import { useRouter } from 'next/navigation'
import { RootState } from '@/store/store';
//input box
const Verify = () => {
const[otp, setOtp]= useState<string[]>(["","","",""]);
const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
const[loading,setLoading]= useState(false)
const dispatch=useDispatch();
const router = useRouter()

const user =useSelector((state:RootState)=>state.auth.user);
useEffect(()=>{
  if(!user) router.replace('/auth/signup');//securite access to page verify

},[user,router])

const handleChange = (
  index: number,
  event: ChangeEvent<HTMLInputElement>):void =>{
const { value } = event.target;
const newOtp = [...otp];
newOtp[index] = value;

setOtp(newOtp);
 
if (value.length === 1 && inputRefs.current[index + 1]) {
  inputRefs.current[index+1]?.focus();
}
};

const handleKeyDown =( index: number,
  event: KeyboardEvent<HTMLInputElement>):void =>{
    if(event.key ==='Backspace' && !inputRefs.current[index]?.value && inputRefs.current[index-1]){
      inputRefs.current[index-1]?.focus();
    }  
  };

  const handleSubmit= async()=>{
   setLoading(true);
   try{
const otpValue = otp.join("");
const response = await axios.post(`${API_URL}/users/verify`,
 {otp:otpValue},
 {withCredentials:true}
);

const verfiedUser =response.data.data.user;
  dispatch(setAuthUser(verfiedUser))
toast.success('Verification successfully!');
router.push('/')
   } 
   catch(error:any){
    toast.error(error.response.data.message || 'An error occurred')

   }
   finally{
    setLoading(false)
   }
  }
  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/users/resend.otp`, null, { withCredentials: true });
      toast.success('New OTP sent to your email!');
    } catch (error: any) {
      toast.error(error.response?.data?.message );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
    <h1 className='text-2xl mb-4 font-semibold'>
       Enter your email verification code here
    </h1>
    
      <div className='flex space-x-4'> 
        {[1,2,3,4,].map((index)=>{
      return <input type='number' key={index} maxLength={1}
      value={otp[index]}
      onChange={(e)=>handleChange(index,e)}
      ref={(el)=>{inputRefs.current[index]=el}}
      onKeyDown={(e)=>handleKeyDown(index,e)}
      className='w-10 h-10 rounded-lg bg-gray-200 text-3xl font-bold text-center no-spinner'/>
    })}
    </div>
   

{!loading&&<div className='flex items-center space-x-4 mt-6'>
  <Button onClick={handleSubmit} variant={'default'} >Submit</Button>
  <Button onClick={handleResendOtp} className='bg-orange-600'>Resent OTP</Button>
</div>}
{loading && (
  <Button className='mt-6'>   
  <Loader className='animate-spin' />
</Button>
)}
    </div>
  );
};

export default Verify
