import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import styleTask from "../../assets/css/task.module.css";
import { useTaskHook } from "../context/TaskContext";

export default function Task(props) {
    const [hoverIndex, setHoverIndex] = useState(null);
    const { task } = props;
    const {deleteTask, isEditTask, toggleEditTaskForm, markTaskComplete} = useTaskHook();

    // Debounced function to handle mouse over
    const handleMouseOver = useCallback(debounce((id) => {
        setHoverIndex(id);
    }, 200), [hoverIndex]);

    // Function to handle mouse leave
    const handleMouseLeave = useCallback(debounce(() => {
        setHoverIndex(null);
    }, 200), [hoverIndex]);

  //  console.log("hoverIndex: ", hoverIndex);

    return (
        <div
            className={styleTask.taskBox}
            onMouseOver={() => handleMouseOver(task._id)}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styleTask.leftBox}>
                <h3 className={styleTask.title}>{task.title}</h3>
                <p className={styleTask.dueDate}>
                    <i className="fa-regular fa-calendar"></i>
                    <span>{task.dueDate}</span>
                </p>
                <p className={styleTask.status} onClick={()=>markTaskComplete(task._id)} >
                    {!task.completed? (
                        <i className="far fa-circle"></i>
                    ) : (
                        <i className={`fa-regular fa-circle-check ${styleTask.complete}`}></i>
                    )}
                </p>
            </div>
            <div className={styleTask.rightBox}>
                <p>{task.desc}</p>
            </div>

            {hoverIndex === task._id ? (
                <div className={styleTask.taskControlDiv}>
                    <i className={`fa-solid fa-trash ${styleTask.delete}`} 
                    onClick={()=>deleteTask(hoverIndex)}></i>


                    <i className={`fa-solid fa-user-pen ${styleTask.edit}`}
                    onClick={()=>toggleEditTaskForm(hoverIndex)}></i>
                </div>
            ) : null}
        </div>
    );
}
