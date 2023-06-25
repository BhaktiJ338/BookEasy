import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password
      });
      alert("Registered Successfully! Proceed to Login.");
    } catch (err) {
      console.log(err);
      alert("Registration failed. Please try again later");
    }
  };

  return (
    <div className="mt-8">
      <div className="">
        <h1 className="text-2xl text-center mb-2">Register</h1>
        <form
          onSubmit={registerUser}
          className="max-w-md mx-auto text-center rounded-lg"
        >
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Register</button>
          <div className="p-2 text-gray-600">
            Already have an account?
            <Link to={"/login"} className="underline text-black">
              {" "}
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
