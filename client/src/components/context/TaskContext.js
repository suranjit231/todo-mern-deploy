import React, {useContext, createContext, useState} from "react";
import { useAuthContext } from "./AuthContext";
import { createNewTask, deleteTaskApiCall, editTaskApiCall, markTaskCompleteApicall, getAllPendingTaskApiCall, getAllCompletedTaskApiCall, searchTaskApiCall } from "../../api/taskApi";
import { toast } from "react-toastify";

const taskContext = createContext();

//===== creating a custome hooks for accessing task ========//
export function useTaskHook(){
    const value = useContext(taskContext);
    return value;
}


//===== create a CustomeTaskContext for providing task context ======//
export default function TaskContextComponent(props){

    const [taskList, setTaskList] = useState([]);
    const {isLogin} = useAuthContext();
    const [isTaskFrom, setTaskForm] = useState(false);
    const [isEditTask, setEditTask] = useState(null);

    //====== add task to task list ======//
   async function addNewTask(task){
        try{
            const response = await createNewTask(task);
            setTaskList((prevTask)=>[...prevTask, response.task]);

        }catch(error){
            toast.error(error.response.data);
        }

    }

    //====== delete task from task list =====//
    async function deleteTask(id){
        try{
            const response = await deleteTaskApiCall(id);
            if(response){
                setTaskList((prevTask)=>prevTask.filter((task)=>task._id !== id));
                toast.success("Task is deleted sucessfully!");
            }
        }catch(error){
            toast.error(error.response.data);
        }
        
    }

    //====== toggle edit task form ========//
    function toggleEditTaskForm(id){
        const task = taskList.find((task)=>task._id===id);

        if(task){
            setTaskForm(true);
            setEditTask(task);
        }
      
    }

    //====== mark task as complete ==========//
   async function markTaskComplete(id){
       
       try{

            const markableTask = taskList.find((tsk)=>tsk._id===id);
            if(markableTask && markableTask.completed){
                toast.error("Task is already completed!");
                return;
            }

            const response= await markTaskCompleteApicall(id);
            if(response){
                setTaskList((prevTask)=>prevTask.map((task)=>task._id===response.task._id?response.task:task));
            }

       }catch(error){
        toast.error(error.response.data);
       }

    }

    //======= edit a task ==========//
   async function editTask(updateableTask, id){
    try{
       const response= await editTaskApiCall(updateableTask, id);
       if(response){
            setTaskList((prevTask)=> prevTask.map((task)=>task._id===id?response.task : task));
            setEditTask(null);
       }

    }catch(error){
        toast.error(error.response.data);
    }

    }

    //====== function closed task form ======//
    function closedTaskForm(){
        setEditTask(null);
        setTaskForm(false);
    }


    //======= get all completed task =====//
   async function getAllCompletedTask(){
        //setTaskList((prevTask)=> prevTask.filter((task)=> task.completed));

        try{
            const response = await getAllCompletedTaskApiCall();
            if(response){
                setTaskList(response.tasks);
            }

        }catch(error){
            toast.error(error.response.data);
        }
    }


//====== get all pending task =====//
async function getAllPendingTask(){
    try{
        const response = await getAllPendingTaskApiCall();
        if (!response.success) {
            setTaskList([]);
            toast.error(response.msg);
        } else {
            setTaskList(response.tasks);
        }
    } catch (error) {
        toast.error(error.response.data || "An error occurred while fetching pending tasks.");
    }
}



    //====== search a task by title ========//
async function searchTaskByTitle(searchText){
    try{
        console.log("search text: ", searchText);
        const response = await searchTaskApiCall(searchText);
        if (!response.success) {
            setTaskList([]);
            toast.error(response.msg);
        } else {
            setTaskList(response.tasks);
        }
    } catch (error) {
        toast.error(error.response.data || "An error occurred while searching for tasks.");
    }
}



    const {children} = props;
  //  console.log("props in takContextComponents: ", props);
    return(
        <taskContext.Provider value={{taskList, addNewTask, isLogin, isTaskFrom, setTaskForm, deleteTask, isEditTask, toggleEditTaskForm, editTask, markTaskComplete, closedTaskForm, setTaskList, getAllCompletedTask, getAllPendingTask, searchTaskByTitle}} >
            {children}
        </taskContext.Provider>
    )
}