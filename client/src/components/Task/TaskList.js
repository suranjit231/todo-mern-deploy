import React,{useEffect, useState} from "react";
import { useTaskHook } from "../context/TaskContext";
import Task from "./task";
import styleTaskList from "../../assets/css/TaskList.module.css";
import CreateTaskForm from "./createTaskForm";
import { fetchTasks } from "../../api/taskApi";


//======== a components which render all the task list =======//
export default function TaskList(){
    const {taskList, addNewTask, isLogin, isTaskFrom, setTaskList, searchTaskByTitle} = useTaskHook();
    const [searchText, setSearchText] = useState("");

    useEffect(()=>{
            //====== make a axoios fetch request for finding all the task provide token in credential

            const loadTasks = async () => {
                try {
                    const response =await fetchTasks();
                   setTaskList(response.tasks); 
                } catch (error) {
                    console.error("Error fetching tasks:", error);
                }
            };
    
            if (isLogin) {
                loadTasks();
            }
        
    },[])


    //======== function handle search =========//
    function handleSearch(){
       if(!searchText?.trim()) return;
        searchTaskByTitle(searchText)
        setSearchText("");
    }
 

    return(
        <div className={styleTaskList.taskListContainer}>
             {/* <h2 className={styleTaskList.mainHeader} >Let's Make Today Productive</h2> */}
             {isTaskFrom?<CreateTaskForm />:null}

                <div className={styleTaskList.taskBoxWrapper}>
                    {taskList.length>0?<div className={styleTaskList.serarchDiv}>
                        <input type="text" placeholder="Search..." value={searchText} 
                        onChange={(e)=>setSearchText(e.target.value)} className={styleTaskList.searchInput} />
                        <button onClick={()=>handleSearch()} >Enter</button>
                    </div>:null}


                {taskList.length > 0 ? (
                    taskList.map((task, ind) => <Task key={ind} id={ind} task={task} />)
                ) : (
                    <p className={styleTaskList.emptyTaskPara} >You haven't added any tasks yet!</p>
                )}
                </div>
           
        </div>
    )
}