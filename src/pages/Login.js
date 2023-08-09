import React from 'react';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import axios from '../api/axios';
import "../styles/Register.scss"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
          <div className="register">
            <div className="column-1">
              <h1>Sign In</h1>
              <span>Log in to your account</span>

              {/* FORM */}
              <form id="form" className='flex flex-col' onSubmit={handleSubmit}>

                {/* USERNAME IPNUT */}
                <input
                  type="text" placeholder='username'
                  id='username'
                  ref={userRef}
                  autoComplete='off'
                  onChange={(e) => setUser(e.target.value)}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                >
                </input>

                {/* PASSWORD IPNUT */}
                <input
                  placeholder='password'
                  type="password"
                  id='pwd'
                  autoComplete='off'
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />

                {/* LOGIN BUTTON */}
                <button className='btn' disabled={!validName || !validPwd ? true : false}>
                  Login
                </button>
              </form>

              <p>
                Don't have any account?<br />
                <span className='linking'>
                  <a href="/register">Create account</a> <br />
                  <a href="#">Forgot your password?</a>
                </span>
              </p>
            </div>

            <div className="column-2">
              <img src={img2} alt="plant"></img>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
