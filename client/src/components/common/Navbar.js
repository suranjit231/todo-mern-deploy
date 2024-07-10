import React, { useState } from "react";
import NavStyles from "../../assets/css/Navbar.module.css";
import { useAuthContext } from "../context/AuthContext";
import { useTaskHook } from "../context/TaskContext";
import SideBar from "./Sidebar";

export default function Navbar(){
    const {showAuthForm, setShowAuthForm, isLogin, logoutUser} = useAuthContext();
    const [isShowSidebar, setShowSidebar] = useState(false);
    const task = useTaskHook();
   // console.log("task in navbar: ", task);

    function toggleSidebar(){
        if(!isLogin) return;
        setShowSidebar((prev)=>!prev);
    }


    return(
        <div className={NavStyles.navContainer}>
           <div className={NavStyles.leftNavbar}>
                        
             <i className={`fa-solid ${!isShowSidebar?"fa-bars":"fa-xmark"}`} onClick={toggleSidebar}></i>                 
                <p>ToDo List</p>
           </div>

           <div className={NavStyles.rightNavbar}>
                {isLogin ? (
                    <p>
                        <span>{isLogin.name}</span> | <span onClick={()=>logoutUser()}>Logout</span>
                    </p>
                ) : (
                    <p onClick={() => setShowAuthForm(true)}>Login</p>
                )}
           </div>

           {isLogin && isShowSidebar?<SideBar isShowSidebar={isShowSidebar} toggleSidebar={toggleSidebar} />:null}
        </div>
    )
}