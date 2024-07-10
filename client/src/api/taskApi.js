import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;


//======= fetch all the task =================//
export const fetchTasks = async () => {
    try {
        const response = await axios.get(`${serverUrl}/api/tasks/viewAllTask`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};


//========== call for create a new task ==========//
export async function createNewTask(task){
    try{

        const response = await axios.post(`${serverUrl}/api/tasks/createTask`, task, {
            withCredentials: true,
        });
        return response.data;

    }catch(error){
        throw error;
    }
}

//=========== api call for delete a task ============//
export async function deleteTaskApiCall(id){
    try{
        const response = await axios.delete(`${serverUrl}/api/tasks/deleteTask/${id}`, {withCredentials:true});
        return response.data;

    }catch(error){
        throw error;
    }
}


//========= api call for edit task ================//
export async function  editTaskApiCall(editTask, id){
    try{
        const response = await axios.put(`${serverUrl}/api/tasks/updateTask/${id}`, editTask, {withCredentials:true});
        return response.data;

    }catch(error){
        throw error;
    }
}


//========== mark task as complete =================//
export async function markTaskCompleteApicall(id) {
    try {
        // If the server expects some payload, adjust accordingly
        const response = await axios.put(`${serverUrl}/api/tasks/markTask/${id}`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
}

//========== get all completed task api call =====//
export async function getAllPendingTaskApiCall(){
    try{
        const response = await axios.get(`${serverUrl}/api/tasks/pendingTask`, {
            withCredentials: true,
        });
        return response.data;

    }catch(error){
        throw error;
    }
}

//======= get all completed task api call ======//

export async function getAllCompletedTaskApiCall(){
    try{
        const response = await axios.get(`${serverUrl}/api/tasks/completedTask`, {
            withCredentials: true,
        });
       
        return response.data;

    }catch(error){
        throw error;
    }
}

//======== search task api call ============//
export async function searchTaskApiCall(searchText){
    try {
        const response = await axios.get(`${serverUrl}/api/tasks/search`, {
            params: {
                q: searchText
            },
            withCredentials: true,
        });
        return response.data;

    } catch (error) {
        throw error;
    }

}