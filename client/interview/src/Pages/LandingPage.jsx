import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { App_FEATURES } from "../utills/data";
import  Model  from "../components/Model"
import Login from "../Pages/Auth/Login"
import SignUp from "../Pages/Auth/SignUp"
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { LuSparkles } from "react-icons/lu"
import ProfileInfoCard from "../components/cards/ProfileInfoCard";
import image from "/src/assets/image.jpeg";


const LandingPage = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handle = () => {
    if(!user) {
      setOpenAuthModel(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="w-full min-h-full bg-[#fffcef]">
        <div className="w-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0" />
        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-black font-bold">Interview AI</div>
            {user ? (
              <ProfileInfoCard />
            ):(
            <button
              className="bg-gradient-to-r from-[#ff9324] to-[#e99a4b] text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
              onClick={() => setOpenAuthModel(true)}
            >
              Login / Sign Up
            </button>
            )}
          </header> 
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 md:mb-0">
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border-amber-300">
                 <LuSparkles /> AI-Powered

                </div>
              </div>

              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                AI Interview with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#ff9324_0%,_#fcd760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                Get role-specific, expand answers when you need them, dive deeper
                into concepts, and organize everything your way. From preparation
                to mastery - your ultimate interview toolkit is here.
              </p>
              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
                onClick={handle}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full min-h-full relative z-10">
        <div>
            <section className="flex items-center justify-center mt-36">
                <img 
                src={image}
                alt="hero Image"
                className="w-[80vw] rounded-lg"
                />
            </section>
        </div>

        <div className="w-full min-h-full bg-[#fffcef] mt-10">
            <div className="container mx-auto px-4 pt-10 p-20">
                <section className="mt-5">
                    <h2 className="text-2xl font-medium text-center mb-12">
                        Features Thet Make You Shine
                    </h2>
                    <div className="flex flex-col items-center gap-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                            {App_FEATURES.slice(0, 3).map((feature) =>(
                                <div
                                key={feature.id}
                                className="bg-[#fffef8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100">
                                    <h3 className="text-base font-semibold mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                    </div>
                            ))}
                        
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {App_FEATURES.slice(3).map((feature) =>(
                            <div
                             key={feature.id}
                                className="bg-[#fffef8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100">
                                    <h3 className="text-base font-semibold mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                    </div>
                        ))}
                    </div>
                    </div>
                </section>
            </div>
        </div>

        <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
            Happy Coding...........
        </div>
      </div>

      <Model 
      isOpen={openAuthModel}
      onClose={() =>{
        setOpenAuthModel(false);
        setCurrentPage("login");
      }}
      hideHeader
      >
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage}/>
          )}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Model> 
    </>
  );
};

export default LandingPage;
