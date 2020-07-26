import React, { useState } from 'react';
import './Login.scss';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');

  const emailUpdate = e => {
    setEmail(e.target.value);
  }

  const passwordUpdate = e => {
    setPassword(e.target.value);
  }

  const confPassUpdate = e => {
    setConfPass(e.target.value);
  }

  return (
    <div className="login">
      <Navbar />
      <form className="loginForm">
        <label htmlFor="email">Email ID</label>
        <input type="text" name="email" onChange={emailUpdate} />
        <label htmlFor="pass">Password</label>
        <input type="password" name="password" onChange={passwordUpdate} />
        <label htmlFor="confPass">Confirm Password</label>
        <input type="password" name="confPass" onChange={confPassUpdate} />
        <input type="submit" value="Log in!" />
      </form>
      <Footer />
    </div>
  )
}

export default Login;