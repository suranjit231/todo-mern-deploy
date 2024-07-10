import React, { useState, useEffect, useRef } from "react";
import authStyle from "../../assets/css/authForm.module.css";
import { useAuthContext } from "../context/AuthContext";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export default function UserAuthenticationForm() {

   const {showAuthForm, setShowAuthForm, userFormData, setUserFormData, handleRegister, handleLogin, isSignUpForm, setSignUpForm} = useAuthContext();

    const [showPassword, setShowPassword] = useState(false);
    const [animationClass, setAnimationClass] = useState("");
 //   const [isSignUpForm, setSignUpForm] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();

    //======= form mount and unmount animation =======//
    useEffect(() => {
        if (showAuthForm) {
            setAnimationClass(authStyle.slideIn);

        } else if (showAuthForm === false) {
            setAnimationClass(authStyle.slideOut);
        }
    }, [showAuthForm]);

    //======= focus on input while form mount ======//
    useEffect(()=>{
        isSignUpForm?nameRef.current.focus():emailRef.current.focus();
      //  console.log("isSignUpForm: ", isSignUpForm.toString());

    },[isSignUpForm]);


    //===== toggle show and hide password input =======//
    function toggleShowPassword() {
        setShowPassword((prevValue) => !prevValue);
    }

    //===== handle change form data ===================//
    function handleChange(e) {
        const { name, value } = e.target;
        setUserFormData((prevData) => ({ ...prevData, [name]: value.trim() }));
    }

    //===== handle submit auth form ===================//
    function handleFormSubmit(e) {
        e.preventDefault();
        const {name, email, password} = userFormData;
        if(isSignUpForm){

            if(!name.trim() || !email.trim() || !password.trim()){
                toast.error("Required input is empty!")
            }else{
                handleRegister(userFormData);
                //setSignUpForm((prev)=>!prev);
                setUserFormData({name:"", email:"", password:""});
            }
        }else{
             if( !email.trim() || !password.trim()){
                toast.error("Required input is empty!")
            }else{
                handleLogin(userFormData);
                setUserFormData({ email:"", password:""});
            }

        }
       

      
    }

    return (
        <div className={`${authStyle.authFormContainer} ${animationClass}`}>
            <form onSubmit={handleFormSubmit} >
                <h2>{isSignUpForm?"Resgister User":"Login User"}</h2>
                <i className={`fa-solid fa-xmark ${authStyle.closeForm}`} 
                   onClick={() => setShowAuthForm((prev) => !prev)}></i>

                   {isSignUpForm?(
                         <div className={authStyle.inputWrapper}>
                         <input ref={nameRef} type="text" name="name" value={userFormData.name}
                                onChange={handleChange} placeholder="Enter Name..." />
                     </div>
                   ):null}
               

                <div className={authStyle.inputWrapper}>
                    <input ref={emailRef} type="email" name="email" value={userFormData.email}
                           onChange={handleChange} placeholder="Enter Email..." />
                </div>

                <div className={`${authStyle.inputWrapper} ${authStyle.passwordDiv}`}>
                    <input type={showPassword ? "text" : "password"} name="password"
                           value={userFormData.password} onChange={handleChange}
                           placeholder="Enter Password..." />
                    <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`} onClick={toggleShowPassword}></i>
                </div>

                <div className={`${authStyle.inputWrapper} ${authStyle.btnWrapper}`}>
                    <button className={authStyle.submitBtn} type="submit">
                        {isSignUpForm?"Register":"Login"}
                    </button>
                </div>

                <div className={`${authStyle.inputWrapper}`}>
                    <span>{isSignUpForm?"Already have an account?":"Don't have an account?"}</span>
                    <span className={authStyle.signUpText} 
                    onClick={()=>setSignUpForm((prev)=>!prev)} >
                         {isSignUpForm?"Login":"Register"}
                    </span>
                    
                </div>

                
            </form>
        </div>
    );
}
