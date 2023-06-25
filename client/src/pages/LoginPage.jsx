import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  const loginUser = async(e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.post('/login', {email, password});
      setUser(data);
      setRedirect(true);
    }
    catch(err){
      console.log(err);
      alert("login failed");
    }
  }

  if(redirect){ //if logged in
    return <Navigate to={'/'}/>
  }

  return (
    <div className="mt-8">
      <div className="">
        <h1 className="text-2xl text-center mb-2">Login</h1>
        <form onSubmit={loginUser} className="max-w-md mx-auto text-center rounded-lg">
          <div>
            <input type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" 
            />
          </div>
          <div>
            <input type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
            />
          </div>
          <button className="primary">Login</button>

          <div className="p-2 text-gray-600">
            Don't have an account?
            <Link to={"/register"} className="underline text-black">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
