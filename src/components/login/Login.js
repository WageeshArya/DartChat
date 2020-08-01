import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import loginBg from '../../background/loginBg.svg';
import DartChatContext from '../../context/DartChatContext';
import Firebase from 'firebase';
export const Login = (props) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [loginErr, setLoginErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const ChatContext = useContext(DartChatContext);

  const emailUpdate = e => {
    setEmail(e.target.value);
  }

  const passwordUpdate = e => {
    setPassword(e.target.value);
  }

  const loginSubmit = async e => {
    e.preventDefault();
    if(emailRegex.test(email)) {
      Firebase
      .auth()
      .signInWithEmailAndPassword(email,password)
      .then(() => {
        ChatContext.setShowChatList(true);
        props.history.push("/dashboard");
      })
      .catch(err => {
        setLoginErr(true);
      })
      setTimeout(() => {
        setLoginErr(false);
      }, 2000)
    }
    else {
      setEmailErr(true);
    }
    setTimeout(() => {
      setEmailErr(false)
    }, 2000)
  }

  return (
    <div className="login">
      <Navbar />
      <div className="loginContainer">
        <div className="loginImgContainer">
          <h2>Welcome back!</h2>
          <h3>Get in touch instantly with all the people you love.</h3>
          <img src={loginBg} alt="Login-image"/>
        </div>
        <div>
          <form className="loginForm" onSubmit={loginSubmit}>
            <div className={emailErr ? 'error' : 'hide'}>Please enter a valid email address.</div>
            <div className={loginErr ? 'error' : 'hide'}>Please re-check your login credentials.</div>
            <h1>Log In!</h1>
            <div>
              <label htmlFor="email">Email ID</label>
              <input type="text" id="email" onChange={emailUpdate} />
            </div>
            <div>
              <label htmlFor="pass">Password</label>
              <input type="password" name="password" onChange={passwordUpdate} />
            </div>
            <div>
              <input type="submit" value="Log in!" />
            </div>
            <Link to="/">Don't have an account? Click here to Sign up!</Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login;