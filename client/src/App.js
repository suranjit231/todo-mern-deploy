import Navbar from "./components/common/Navbar";
import UserAuthenticationForm from "./components/auth/userAuthentiaction";
import AuthContextHook from "./components/context/AuthContext";
import { useState } from "react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TaskContextComponent from "./components/context/TaskContext";
import TaskList from "./components/Task/TaskList";




function App() {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setLogin] = useState(false);


  return (
    <div className="App">
      <AuthContextHook showAuthForm={showAuthForm} setShowAuthForm={setShowAuthForm}
        isLogin={isLogin} setLogin={setLogin} >
          <TaskContextComponent>
            <Navbar /> {/* Navbar has access to both contexts */}
            {showAuthForm && !isLogin ? (<UserAuthenticationForm />) : null }
            {isLogin ? (
              <TaskList />
            ) : null}


          </TaskContextComponent>
        

          <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ top: '40px', right: '5px' }}
        />
      </AuthContextHook>
    </div>
  );
}

export default App;
