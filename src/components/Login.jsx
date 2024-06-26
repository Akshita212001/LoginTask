import React, { useEffect, useState } from "react";
import "./Login.css";
import Logo from "../live.webp";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailTouched) {
      if (!userName) {
        setEmailError('Email is required');
      } else if (!emailRegex.test(userName)) {
        setEmailError('Email must be valid');
      } else {
        setEmailError('');
      }
    }

    if (passwordTouched) {
      if (!password) {
        setPasswordError('Password is required');
      } else {
        setPasswordError('');
      }
    }
  }, [userName, password, emailTouched, passwordTouched]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', userName);
    formData.append('password', password);

    try {
      const response = await axios.post('https://liveload-api.vercel.app/api/v1/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('response=>', response)

      if (response.status === 200) {
        toast.success(response.data.message,{ autoClose: 3000 }); 
      } else {
        toast.error('Login failed. Please check your credentials and try again.',{ autoClose: 3000 });
      }

    } catch (err) {
      toast.error('Login failed. Please check your credentials and try again.',{ autoClose: 3000 });
      console.error(err);
    }
  };

  return (
    <>
      
      <div className="container form-container">
      <ToastContainer />
        <div>
          <img src={Logo} alt="Logo" className="logo" />
        </div>

        <div className="form-box">
           <div style={{justifyContent:"space-between",display:"flex",alignItems:"center",fontWeight:"bolder",color:"black"}}>
           <h3>Login To LiveLoads

           </h3>
           <span style={{textDecoration:"underline",color:"blue",marginTop:"20px",fontWeight:"500",fontSize:"15px"}}>
            Don't have an account ?
           </span>
           </div>
           
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                {"Email address"}
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={() => setEmailTouched(true)}
              />
            </div>
            {emailError && emailTouched && <div className="errortext text-danger mt-5">{emailError}</div>}
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                {"Password"}
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
              />
            </div>
            {passwordError && passwordTouched && <div className="errortext text-danger my-2">{passwordError}</div>}
            <div className="forgot-password text-black">
              <span>{"Forgot Password?"}</span>
            </div>
            <button
              type="submit"
              className="btn btn-primary login"
              style={{width:"470px"}}
            >
              {"Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;


// import React from 'react'

// const Login = () => {
//   return (
//     <div className="login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
//       <div className='50-w  p-5 rounded bg-white'>
//       <form>
//         <h3 className='text-center'>Sign In</h3>
//         <div className='mb-2'>
//         <label htmlFor='email'>Email</label>
//         <input type="email" placeholder='Enter Email' className='form-control'></input>
//         </div>
//         <div className='mb-2'>
//         <label htmlFor='password'>Password</label>
//         <input type="password" placeholder='Enter Password' className='form-control'></input>
//         </div>
//          <div className='mb-2'>
//           <input type="checkbox" className='custom-control custom-checkbox ' id='check' />
//           <label htmlFor='check' className='custom-input-label ms-2'>
//             Remember Me
//           </label>
//          </div>
//          <div className="d-grid">
//           <button className='btn-btn-primary'>Sign In</button>
//          </div>
//          <p className='text-right'>
//           Forgot <a href="">Password?</a>
//           <a href=" ">Sign Up</a>

//          </p>
//       </form>
//       </div>
//     </div>
//   )
// }

// export default Login