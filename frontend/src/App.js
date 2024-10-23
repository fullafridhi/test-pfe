import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import ForgetPassword from './pages/ForgetPassword';
import Signup from './pages/Signup';
import Verify from './pages/Verify';
import Home from './pages/Home';
import Navbar from './components/Navbar';
function App() {

  return (
    
      <div className="App">

         <header className="App-header">
         <Navbar />
        <Routes>
        
       
          <Route path ='/home'element={<Home/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
        </header>
      </div>
    
  );
};

export default App;