import React,{useEffect, useState} from "react";
import styleSidebar from "../../assets/css/SideBar.module.css";
import { useTaskHook } from "../context/TaskContext";

export default function SideBar({ isShowSidebar, toggleSidebar}){
    const [isAnimating, setIsAnimating] = useState(false);
    const  {setTaskForm, isTaskFrom, getAllCompletedTask, getAllPendingTask} = useTaskHook();
 
    useEffect(()=>{
        if(isShowSidebar){
            setIsAnimating(true);
        }else{
            setTimeout(() => {
                setIsAnimating(false);
                
            }, 400);
        }
    },[isShowSidebar])

    //====== showing create task form and hide the sidebar =====//
    function showAddTaskForm(){
        setTaskForm(true)
        toggleSidebar()
    }
   
    return(
        <div className={`${styleSidebar.sideBarContainer} 
        ${isAnimating?styleSidebar.slideIn:styleSidebar.slideOut}`}>

            <p>About</p>
            <p onClick={()=> showAddTaskForm()} >Create Task</p>
            <p onClick={()=>getAllCompletedTask()}>Completed Task</p>
            <p onClick={()=>getAllPendingTask()}>Pending Task</p>

        </div>
        
    )
}