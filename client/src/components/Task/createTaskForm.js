import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useTaskHook } from "../context/TaskContext";
import styleTaskForm from "../../assets/css/taskForm.module.css";

export default function CreateTaskForm() {
    const { addNewTask, setTaskForm, isEditTask, toggleEditTaskForm, editTask, closedTaskForm } = useTaskHook();
    const [title, setTitle] = useState("");
    const [desc, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    // Animate on mount and unmount
    useEffect(() => {
        setIsVisible(true);
        return () => {
            setIsVisible(false);
        };
    }, []);

    useEffect(()=>{
        if(isEditTask){
            setTitle(isEditTask.title);
            setDescription(isEditTask.desc);
            setDueDate(isEditTask.dueDate);
        }

    },[])

    // Function to handle form submission
    function handleCreateFormSubmit(e) {
        e.preventDefault();
        if (!title.trim() || !desc.trim() || !dueDate.trim()) {
            toast.error("Empty input field!");
            return;
        }else if(isEditTask){
            editTask({title:title, desc:desc, dueDate:dueDate}, isEditTask._id);

            clearTaskInput();
            setTaskForm(false);
        }
        else {
            addNewTask({ title: title, desc: desc, dueDate: dueDate});
            clearTaskInput();
            setTaskForm(false); // Hide form after submission
        }
    }


    // Clear input fields
    function clearTaskInput() {
        setTitle("");
        setDescription("");
        setDueDate("");
    }

    return (
        <div className={`${styleTaskForm.taskFromContainer} ${isVisible ? styleTaskForm.slideIn : styleTaskForm.slideOut}`}>
            <form onSubmit={handleCreateFormSubmit}>
                <i className={`fa-regular fa-circle-xmark ${styleTaskForm.closeBtn}`} onClick={()=>closedTaskForm()}></i>
                <h3>{!isEditTask?"Create New Task":"Edit Your Task"}</h3>

                <div className={styleTaskForm.formControlDiv}>
                    <input type="text" name="title" value={title} placeholder="Title..." onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className={styleTaskForm.formControlDiv}>
                    <input type="text" name="desc" value={desc} placeholder="Description..." onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className={styleTaskForm.formControlDiv}>
                    <input type="date" name="dueDate" value={dueDate} placeholder="Description..." onChange={(e) => setDueDate(e.target.value)} />
                </div>

                <div className={`${styleTaskForm.formControlDiv} ${styleTaskForm.buttonDiv}`}>
                    <button type="submit" className={styleTaskForm.addBtn}>{isEditTask?"Edit Task":"Add Task"}</button>
                    <button type="reset" onClick={clearTaskInput} className={styleTaskForm.clearBtn}>Clear</button>
                </div>
            </form>
        </div>
    );
}
