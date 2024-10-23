import React, { useState } from "react";
import { toast } from "sonner"; 
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/authSlice"; 
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import "./signup.css";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "",
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
      const response = await axios.post(`${API_URL}/users/signup`, formData, {
        withCredentials: true,
      });

      const user = response.data.data.user;
      toast.success("Signup successful");
      dispatch(setAuthUser(user));
      navigate("/verify");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Signup failed");
      } else {
        toast.error("An error occurred, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="logo">LOGO</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm" className="label">
              Confirm Password
            </label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              value={formData.passwordConfirm}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="role" className="label">
              Role
            </label>
            <input
              type="text"
              name="role"
              placeholder="Student or Teacher"
              value={formData.role}
              onChange={handleChange}
              className="input"
            />
          </div>
          {!loading ? (
            <button type="submit" className="button">
              Submit
            </button>
          ) : (
            <button className="button" disabled>
              <Loader className="animate-spin" />
            </button>
          )}
        </form>
        <div className="login-link">
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
