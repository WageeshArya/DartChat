import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import signupBg from '../../background/signupBg.svg';
import DartChatContext from '../../context/DartChatContext';
import './Signup.scss';
import Firebase from 'firebase';
export const Signup = (props) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');

  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [passLenErr, setPassLenErr] = useState(false);

  const ChatContext = useContext(DartChatContext);

  const emailUpdate = e => {
    setEmail(e.target.value);
  }

  const passwordUpdate = e => {
    setPassword(e.target.value);
  }

  const confPassUpdate = e => {
    setConfPass(e.target.value);
  }

  const signupSubmit = e => {
    e.preventDefault();
    if(emailRegex.test(email) && (password === confPass) && (password.length > 6 && confPass.length > 6)) {
      Firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const user = {
          email: response.user.email
        }
        Firebase
        .firestore()
        .collection('users')
        .doc(user.email)
        .set({
          email: response.user.email
        })
        .then(() => {
          ChatContext.setShowChatList(true);
          props.history.push('/dashboard')
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
      }) 
    }
    else {
      if(password !== confPass && !emailRegex.test(email)) {
        setPassErr(true);
        setEmailErr(true);
      }
      else if(!emailRegex.test(email)) {
        setEmailErr(true);
      }
      else if(password !== confPass) {
        setPassErr(true);
      }
      else {
        setPassLenErr(true);
      }
      setTimeout(() => {
        setEmailErr(false);
        setPassErr(false);
        setPassLenErr(false);
      },2000);
    }
  }


  return (
    <div className="signup" onSubmit={signupSubmit}>
      <Navbar />
      <div className="signupContainer">
        <form className="signupForm">
          <div className={emailErr ? 'error' : 'hide' }>Please enter a valid Email ID</div>
          <div className={passErr ? 'error' : 'hide' }>The passwords you entered do not match</div>
          <div className={passLenErr ? 'error' : 'hide'}>Passwords must exceed 6 characters</div>
          <h1>Sign up!</h1>
          <div>
            <label htmlFor="email">Email ID</label>
            <input type="text" name="email" required onChange={emailUpdate} />
          </div>
          <div>
            <label htmlFor="pass">Password</label>
            <input type="password" name="password" required onChange={passwordUpdate} />
          </div>
          <div>
            <label htmlFor="confPass">Confirm Password</label>
            <input type="password" name="confPass" required onChange={confPassUpdate} />
          </div>
          <div>
            <input type="submit" value="Sign up!" />
          </div>
          <Link to="/login">Already have an account? Click here to Log in!</Link>
        </form>
        <div className="signupImgContainer">
          <h2>Chat it up!</h2>
          <h3>Free. Simple. Concise.</h3>
          <img src={signupBg} alt="Signup-image"/>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Signup;
