import React, { useState ,useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Inpute";
import {validateEmail} from "../../utills/help"
import axiosInstance from "../../utills/axios";
import { API_PATHS } from "../../utills/apiPaths";
import { UserContext } from "../../context/UserContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


const { updateUser } = useContext(UserContext);


  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault(); 
      
    if(!validateEmail(email)){
        setError("please Enter a valid email address.");
        return;
    }
    if(!password){
        setError("please Enter the Password.");
        return;
    }
    setError("");

    // Login API call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });

      const { token } = response.data;

      if(token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    }catch (error){
        if(error.response && error.response.data.message){
            setError(error.response.data.message);
        } else {
            setError("Something went Wrong. please try again.");
        }
    }

  };

  return (
    <>
      <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please Enter Your details to Log in
        </p>

        <form onSubmit={handlelogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.come"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password "
            placeholder="Minimum 8 characters"
            type="password"
          />

          {error && (
            <p className="text-red-500 text-xs pb-2.5">{error}</p>
          )}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't Have An Account?{" "}
            <button
              className="font-medium text-primary underline cursor-pointer"
              onClick={() => {
                setCurrentPage("signup");
              }}
            >
              SignUp
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
