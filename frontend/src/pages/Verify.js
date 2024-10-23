import React, { useEffect, useRef, useState } from 'react';
import { Toaster, toast } from 'sonner'; 
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/authSlice'; 
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import './verify.css'; 
const Verify = () => {
  const API_URL = process.env.REACT_APP_BACKEND_URL;
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) navigate('/signup');
  }, [user, navigate]);

  const handleChange = (index, event) => {
    const { value } = event.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !inputRefs.current[index]?.value && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const otpValue = otp.join('');
      const response = await axios.post(`${API_URL}/users/verify`, { otp: otpValue }, { withCredentials: true });
      const verifiedUser = response.data.data.user;
      dispatch(setAuthUser(verifiedUser));
      toast.success('Verification successful!');
      navigate('/signup'); // Redirect after successful verification
    } catch (error) {
      toast.error(error.response.data.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/users/resend.otp`, null, { withCredentials: true });
      toast.success('New OTP sent to your email!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>Enter your email verification code here</h1>
      <div className='input-container'>
        {otp.map((_, index) => (
          <input
            type='number'
            key={index}
            maxLength={1}
            value={otp[index]}
            onChange={(e) => handleChange(index, e)}
            ref={(el) => { inputRefs.current[index] = el; }}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className='input'
          />
        ))}
      </div>
      {!loading && (
        <div className='button-container'>
          <button onClick={handleSubmit} className="btn">Submit</button>
          <button onClick={handleResendOtp} className='btn btn-resend'>Resend OTP</button>
        </div>
      )}
      {loading && (
        <button className='spinner'>
          <Loader className='animate-spin' />
        </button>
      )}
      <Toaster /> 
    </div>
  );
};

export default Verify;
