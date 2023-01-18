import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import './Signin.css'
import landing from '../Signup/landing.jpeg'
import { ToastContainer, toast } from "react-toastify";
export default function Signin() {
     const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const { signIn } = UserAuth()
    const [isDisabled, setDisabled] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()
        setDisabled(true)
        try {
            await signIn (email, password)
            navigate('/dashboard')
            setDisabled(false);
        } catch (error) {
            toast.error(error.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setDisabled(false);
        }
    }
  return (
    <div className="signin">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="signin-floater">
        <div
          className="signup-left"
          style={{
            backgroundImage: `url(${landing})`,
            backgroundPosition: "center",
            objectFit: "fill",
          }}
        ></div>
        <div className="signin-right">
          <div className="signin-form">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} className="forms">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" disabled={isDisabled}>
                Sign In
              </button>
            </form>
            <p>
              Don't have an account yet?
              <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
