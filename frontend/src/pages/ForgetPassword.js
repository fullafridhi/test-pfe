import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL; 

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/users/forget-password`, { email }, { withCredentials: true });
      toast.success('Reset code sent to your email');
      navigate(`/auth/resetpassword?email=${encodeURIComponent(email)}`); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-screen flex items-center justify-center flex-col'>
      <h1 className='text-xl text-gray-900 mb-4 font-medium'>
        Enter your email to get a code for resetting your password
      </h1>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='block w-[40%] mb-4 mx-auto rounded-lg bg-gray-300 px-4 py-3'
        required
      />
      {!loading && <button onClick={handleSubmit}>Submit</button>}
      {loading && (
        <button disabled>
          <Loader className='animate-spin' />
        </button>
      )}
    </div>
  );
};

export default ForgetPassword;
