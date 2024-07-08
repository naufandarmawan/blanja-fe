/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Textfield from '../components/base/textfield/textfield';
import Button from '../components/base/button/button';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '@/configs/redux/action/auth.action';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const LoginCustomer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [form, setForm] = useState({
        email: '',
        password: '',
        role: 'customer'
    });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
       const { id, value } = e.target;
       setForm((prevForm) => ({
        ...prevForm,
        [id]: value
       }));
       console.log({ [id]: value });
    };

    const handleRegister = () => {
      navigate('/auth/register');
    };

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePassword = (password) => {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
    };

    const handleLoginCustomer = () => {
      let valid = true;

      if (!form.email) {
        setEmailError('Email is required');
        valid = false;
      } else if (!validateEmail(form.email)) {
        setEmailError('Invalid email format');
        valid = false;
      } else {
        setEmailError('');
      }

      if (!form.password) {
        setPasswordError('Password is required');
        valid = false;
      } else if (!validatePassword(form.password)) {
        setPasswordError('Password must be at least 6 characters and contain both letters and numbers');
        valid = false;
      } else {
        setPasswordError('');
      }

      if (!valid) {
        toast.error('Please check again your Email & Password!!');
        return;
      }

      dispatch(loginAction(form.email, form.password, navigate));
    };

    useEffect(() => {
      if (user) {
        navigate('/home');
      }
    }, [user, navigate]);

  return (
    <div>
        <div className='flex justify-center px-105'>
          <Textfield 
              type="email"
              id="email"
              spellCheck={false}
              required
              placeholder="Email"
              className='w-96 h-12'
              value={form.email}
              onChange={handleChange}
          />
        </div>
        {emailError && (
          <div className='flex justify-center text-red-500 pr-48'>
            {emailError}
          </div>
        )}
        <div className='flex justify-center px-105'>
          <Textfield 
              type="password"
              id="password"
              spellCheck={false}
              required
              placeholder="Password"
              className='w-96 h-12'
              value={form.password}
              onChange={handleChange}
          />
        </div>
        {passwordError && (
          <div className='flex justify-center text-red-500 pr-48'>
            {passwordError}
          </div>
        )}
        <div className='flex justify-center ml-64 text-red-maroon hover:font-semibold hover:text-orange-500 cursor-pointer'>
          Forgot password?
        </div>
        <div className='flex justify-center py-5'>
          <Button
            name="Login"
            onClick={handleLoginCustomer}
            className="flex justify-center"
          />
        </div>
        {/* <ToastContainer position='bottom-right' /> */}
        <div className='flex justify-center'>
          <p>Don&#39;t have a Blanja account?{' '}
          <span onClick={handleRegister} className='text-red-maroon hover:font-semibold hover:text-orange-500 cursor-pointer'>
              Register
          </span>
          </p>
        </div>
    </div>
  );
};

export default LoginCustomer;
