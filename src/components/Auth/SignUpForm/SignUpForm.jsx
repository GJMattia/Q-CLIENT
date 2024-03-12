import React, { useState } from 'react';
import { signUp } from '../../../../utilities/user-services';
import './SignUpForm.css';
import { createAccount } from '../../../../utilities/accounts-api';

export default function SignUpForm({ setUser, log, setLog }) {

  function toggleLog() {
    setLog(false);
    document.body.style.overflow = 'auto';
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  });

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { error, confirm, ...data } = formData;
      const user = await signUp(data);
      toggleLog();
      createAccount({ userID: user._id });
      setUser(user);
      console.log(log)
    } catch (error) {
      setFormData({ ...formData, error: 'Sign Up Failed - Try Again' });
    }
  };

  const disable = formData.password !== formData.confirm;

  return (
    <>
      <form className='SignUpForm' autoComplete="off" onSubmit={handleSubmit}>
        <label className='CreateUser'>👤</label>
        <input min="1" max="10" placeholder='Pick a Username' type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label className='CreateEmail'>📧</label>
        <input min="1" max="25" placeholder='Your email address' type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label className='CreatePW1'>🔒</label>
        <input min="1" max="25" placeholder='Create a password' type="password" name="password" value={formData.password} onChange={handleChange} required />
        <label className='CreatePW2'>🔒</label>
        <input min="1" max="15" placeholder='Confirm your password' type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
        <button className='SignUpBtn' type="submit" disabled={disable}>
          Create My Account
        </button>
      </form>
      <p className="Error2">{formData.error}</p>
    </>
  );
};

