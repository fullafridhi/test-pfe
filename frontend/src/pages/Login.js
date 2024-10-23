import React, { useState } from "react";

import axios from "axios";
import { Loader } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice"; // Adjust path as needed
import { useNavigate } from "react-router-dom"; // Use React Router for navigation
import { toast } from "sonner"; 
import { Link } from "react-router-dom";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/login`, formData, {
        withCredentials: true,
      });
      const user = response.data.data.user;
      toast.success("Login successful");
      dispatch(setAuthUser(user));
      navigate("/home"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="shadow-md rounded-lg w-[80%] sm:w-[350px] md:w-[350px] lg:w-[450px] p-8 bg-white">
        <h1 className="text-center font-bold text-3xl mb-4 mt-4">LOGO</h1>
        <form onSubmit={submitHandler}>
          <div className="mt-4">
            <label htmlFor="email" className="block mb-2 text-sm font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-200 rounded-md outline-none w-full"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block mb-2 text-sm font-bold">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="px-4 py-2 bg-gray-200 rounded-md outline-none w-full"
            />
            <Link
              to="/forgetpassword"
              className="text-red-500 text-right block text-sm font-semibold mt-2"
            >
              Forget password
            </Link>
          </div>

          {!loading ? (
            <button type="submit" className="mt-6 w-full" size={"lg"}>
              Submit
            </button>
          ) : (
            <button className="mt-6 w-full" size={"lg"}>
              <Loader className="animate-spin" />
            </button>
          )}
        </form>
        <h1 className="mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text-blue-600 cursor-pointer">Signup</span>
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
