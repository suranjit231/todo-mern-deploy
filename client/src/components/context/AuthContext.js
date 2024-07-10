import { createContext, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const authContext = createContext();

export function useAuthContext() {
    const value = useContext(authContext);
    return value;
}

function AuthContextHook(props) {
    const { showAuthForm, setShowAuthForm, isLogin, setLogin, children } = props;
    const [userFormData, setUserFormData] = useState({ name: "", email: "", password: "" });
    const [userList, setUserList] = useState([]);
    const [isSignUpForm, setSignUpForm] = useState(false);

    //==== handle register while submit register form ======//
    async function handleRegister(newUser) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/signup`, newUser);
            if (response.data.success) {
                setUserList((prevUserList) => [...prevUserList, response.data.user]);
                setSignUpForm((prev) => !prev);
                toast.success("User registered successfully");
            } else {
                toast.error("User already exists");
            }
        } catch (error) {
            console.error("There was an error registering the user!", error.response.data);
            toast.error(error.response.data);
        }
    }

    //======= handle login while submit login form ===//
    async function handleLogin(loginData) {
       // console.log("process.env.SERVER_URL: ", process.env.REACT_APP_SERVER_URL);
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/signin`, loginData, { withCredentials: true });
            console.log("response in login success: ", response.data);
            if (response.data.sucess) {
               
                setLogin(response.data.signinResult.removedPasswordUser); // Assuming `signinResult` contains the user data
                toast.success("User login successful");
            } else {
                toast.error(response.data.msg);
            }
        } catch (error) {
            console.error("There was an error logging in the user!", error);
            toast.error("User login failed");
        }
    }


    //======== logout user =============//
    async function logoutUser(){
        try{

            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/logout`, {
                withCredentials: true,
            });

            if(response){
                setLogin(false);
                setShowAuthForm(false);
            }

        }catch(error){
            toast.error("logout failds!");
        }
    }

    return (
        <authContext.Provider value={{ showAuthForm, setShowAuthForm, userFormData, setUserFormData, handleRegister, handleLogin, isLogin, isSignUpForm, setSignUpForm, logoutUser }}>
            {children}
          
        </authContext.Provider>
    );
}

export default AuthContextHook;
