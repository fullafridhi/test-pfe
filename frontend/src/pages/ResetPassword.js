import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { Loader } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { setAuthUser } from "../redux/authSlice"; 


const API_URL = process.env.REACT_APP_BACKEND_URL;
const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleSubmit = async () => {
    if (!otp || !email || !password || !passwordConfirm) return;
    setLoading(true);
    try {
      const data = { email, otp, password, passwordConfirm };
      const response = await axios.post(
        `${API_URL}/users/reset-password`,
        data,
        { withCredentials: true }
      );
      dispatch(setAuthUser(response.data.data.user));
      toast.success("Password reset successful!");
      navigate("/login"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <input
        type="number"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="block w-[30%] mx-auto px-6 py-3 bg-gray-300 rounded-lg no-spinner outline-none"
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-[30%] mx-auto px-6 py-3 bg-gray-300 rounded-lg mb-4 mt-4 outline-none"
      />
      <input
        type="password"
        placeholder="Confirm password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        className="block w-[30%] mx-auto px-6 py-3 bg-gray-300 rounded-lg outline-none"
      />
      <div className="flex items-center space-x-4 mt-6">
        {!loading && <button onClick={handleSubmit}>Change password</button>}
        {loading && (
          <button>
            <Loader className="animate-spin" />
          </button>
        )}
        <button
          variant={"ghost"}
          onClick={() => navigate("/auth/forgetpassword")}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
