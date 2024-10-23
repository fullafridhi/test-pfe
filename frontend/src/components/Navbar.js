import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/authSlice";
import './navbar.css'

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(setAuthUser(null)); 
    navigate("/login"); 
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
         kidQuest Academy
        </Link>
        <ul className="nav-links">
          {user ? (
            <>
              <li>Welcome, {user.username}</li>
              <li>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup" className="nav-link">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
