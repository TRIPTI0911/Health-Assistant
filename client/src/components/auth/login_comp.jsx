import React from 'react'
import { Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login_comp({toggleAuth}) {

  const navigate=useNavigate();
  const phoneNumber = {
    value: '',
    error: '',
    changeHandler: (e) => {
      phoneNumber.value = e.target.value;
    }
  }
  const password = {
    value: '',
    error: '',
    changeHandler: (e) => {
      password.value = e.target.value;
    }
  }
  const handelLogin = (e) => {
    e.preventDefault();
    if(phoneNumber.value.length<10){
      phoneNumber.error='Phone number must be 10 digits';
      return;
    }
    if(password.value.length<6){
      password.error='Password must be 6 digits';
      return;
    }
    axios.post('http://localhost:5000/api/auth/login',{phone:phoneNumber.value,password:password.value})
    .then(res=>{
      console.log(res.data);
      localStorage.setItem('token',res.data.token);
      navigate('/');
    })
    .catch(err=>{
      console.log(err);
    })
  }


  return (
    // Login form goes here
    <>
          <form className='w-full'>
            <h1 className='text-4xl font-semi-bold mb-5'>Login</h1>
            <p className='mb-6'>Welcome back! Please enter your details.</p>
            <div className='mb-5'>
              <input type="text" id='phone' placeholder='Phone' className='w-full border-b-2  border-gray-300 py-2 focus:outline-none focus:border-blue-500' value={phoneNumber.value} onChange={phoneNumber.changeHandler} required/>
              {phoneNumber.error&&<Typography variant='caption' color='error'>{phoneNumber.error}</Typography>}
            </div>
            <div className='mb-5'>
              <input type="password" id='password' placeholder='Password' className='w-full border-b-2 border-gray-300  py-2  focus:outline-none focus:border-blue-500' value={password.value} onChange={password.changeHandler} required />
              {password.error&&<Typography variant='caption' color='error'>{password.error}</Typography>}
            </div>
            <div className='mb-5'>
              <button className='w-full bg-black text-xl text-white py-2 rounded-md' onClick={handelLogin}>Login</button>
            </div>
            {/* Make a boundary */}
            <div className='flex justify-between items-center mb-5'>
              <div className='w-2/5 border-b-2 border-gray-300'></div>
              <div>or</div>
              <div className='w-2/5 border-b-2 border-gray-300'></div>
            </div>
            {/* Sign in with google button */}
            <div className='mb-5'>
              <button className='w-full bg-red-500 text-xl text-white py-2 rounded-md'>Sign in with Google</button>
            </div>
            <div className='flex justify-center'>
              <p>Don't have an account? <span className='text-blue-500 hover:cursor-pointer' onClick={toggleAuth}>Signup</span></p>
            </div>
          </form>
    </>
  )
}

export default Login_comp