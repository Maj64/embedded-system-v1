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

    try {
      // const response = await axios.post(
      //     REGISTER_URL,
      //     JSON.stringify({ user, pwd }),
      //     {
      //         header: { 'Content-type': 'application/json' },
      //         withCredentials: true
      //     }
      // );
      // console.log(response.data);
      // console.log(response.accessToken);
      // console.log(response.stringify(response));
      setSuccess(true);
    } catch (error) {
      if (!error.response) {
        setErrMsg('No Server Response');
      } else if (error.response?.status === 409) {
        errMsg('Username Taken');
      } else {
        errMsg('Registration Failed')
      }
      errRef.current.focus();
    }
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
                  aria-describedby='uidnote'
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                >
                </input>
                <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters. <br />
                  Must begin with a letter. <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>

                {/* PASSWORD IPNUT */}
                <input
                  placeholder='password'
                  type="password"
                  id='pwd'
                  autoComplete='off'
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby='pwdnote'
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters. <br />
                  Must include uppercase and lowercase letters,
                  a number and a special characters. <br />
                  Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>

                {/* LOGIN BUTTON */}
                <button className='btn' disabled={!validName || !validPwd ? true : false}>
                  Login
                </button>
              </form>
              <p>
                Don't have an account?<br />
                <span className='linking'>
                  <a href="/register">Create account</a> <br />
                  <a href="#">Forgot for password?</a>
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
