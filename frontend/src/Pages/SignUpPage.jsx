import { useState } from "react";
import chatfinityIcon from "../assets/Chatfinity_transparent-.png"
import "./SignupPage.css"
import {useNavigate} from 'react-router-dom';
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const SignUpPage = () => {

  const [showPassword , setShowPassword] = useState(false);
  const [formData , setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate();
  const {signup , isSigningUp} = useAuthStore();

  const handleLoginBtnClick = () => {
    navigate('/login')
  }

  const handleShowPasswordClick = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required!");
    if (!formData.email.trim()) return toast.error("email is required!");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required!")

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if(success === true) signup(formData)
  }

  return (
    <div className="page">
      <form className="mainForm">

         <img src={chatfinityIcon}/>

        <span id="welcometxt">
         <h1>Welcome to Chatfinity!</h1>
         </span>

        <input value={formData.fullName} onChange={(e) => setFormData({...formData , fullName: e.target.value})} id="textInput" type="text" placeholder="Full name" minLength={4}/>

        <input value={formData.email} onChange={(e) => setFormData({...formData , email: e.target.value})} id="textInput" type="email" placeholder="Email"/>

        <input value={formData.password} onChange={(e) => setFormData({...formData , password: e.target.value})} id="textInput" type={showPassword? "text" : "password"} placeholder="Password" minLength={6}/>
        <button id="showbtn" onClick={handleShowPasswordClick}>Show Password</button>

        <button onClick={handleSubmit} disabled={isSigningUp} id="CAbtn">Create Account</button>

        <span className="logintxt">
        <p>Already have an account?</p>
        <button id="loginbtn" onClick={handleLoginBtnClick}>Login</button>
        </span>

      </form>
    </div>
  )
}

export default SignUpPage
