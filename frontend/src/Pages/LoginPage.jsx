import { useState } from "react";
import chatfinityIcon from "../assets/Chatfinity_transparent-.png"
import "./LoginPage.css"
import {useNavigate} from 'react-router-dom';
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const LoginPage = () => {

  const [showPassword , setShowPassword] = useState(false);
  const [formData , setFormData] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate();
  const {login , isLoggingIn} = useAuthStore();

  const handleSignupBtnClick = () => {
    navigate('/signup')
  }

  const handleShowPasswordClick = (e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("email is required!");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required!")

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if(success === true) login(formData)
  }

  return (
    <div className="page">
      <form className="mainForm">

         <img src={chatfinityIcon}/>

         <span id="welcometxt">
    <div id="welcomeText">
        <h1>Welcome back to Chatfinity!</h1>
    </div>
</span>




        <input value={formData.email} onChange={(e) => setFormData({...formData , email: e.target.value})} id="textInput" type="email" placeholder="Email"/>

        <input value={formData.password} onChange={(e) => setFormData({...formData , password: e.target.value})} id="textInput" type={showPassword? "text" : "password"} placeholder="Password" minLength={6}/>
        <button id="showbtn" onClick={handleShowPasswordClick}>Show Password</button>

        <button onClick={handleSubmit} disabled={isLoggingIn} id="LIbtn">Log In</button>

        <span className="signintxt">
        <p>Don&apos;t have an account? </p>
        <button id="signinbtn" onClick={handleSignupBtnClick}>Create One!</button>
        </span>

      </form>
    </div>
  )
}

export default LoginPage;
