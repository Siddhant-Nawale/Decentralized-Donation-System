import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import {useNavigate } from 'react-router-dom';
import {
    onSnapshot,
    collection,
    doc,
    getDoc
  
  } from 'firebase/firestore';
import db from '../../firebase';
import { Navbar } from "./";
import logo from "../../../images/img3.jpg";


const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-3 rounded-sm p-2 w-80 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );


const Login = () =>{
    const [formDataLogin, setformDataLogin] = useState({ UserName: "", Password: ""});
    const navigate = useNavigate(); 
    const handleChange = (e, name) => {
    // console.log(name);
    setformDataLogin((prevState) => ({ ...prevState, [name]: e.target.value }));
    console.log(formDataLogin);
    };

    const handleSubmit = (e, name) => {
        const { UserName, Password} = formDataLogin;

        e.preventDefault();
    
        if (!UserName || !Password ) return;

        CredentialVerify();
    };

    const CredentialVerify = async() =>{
        // const { data, isLoading, error } = useRealTimeQuery('/me/friends');
        const colletionRef = collection(db, 'Login');
        
        const docRef = doc(db, "Login", formDataLogin.UserName);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            if(docSnap.data().Uname == formDataLogin.UserName && docSnap.data().Password == formDataLogin.Password){
                console.log("Authenticated");

                navigate("/UserHome");
            }
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        
    }

    return (
      <div className="gradient-bg-welcome  h-fit ">
        <div className="h-screen">
          <Navbar/>
          <div className="flex flex-row flex-1 text-white w-full md:justify-center">
            <div className="w-1/2 flex flex-row justify-center">
              <div className = "p-5 mt-20 ml-40 sm:w-90 h-96 w-full flex flex-col justify-start items-left blue-glassmorphism w-96">
                <div className="mt-3 mb-5  items-center "><h1 className=" text-5xl">Login</h1></div>
                <div className = "my-0.5">
                  <Input placeholder="UserName" name="UserName" type="text" handleChange={handleChange} />
                  <Input className="text-white" placeholder="Password" name="Password" type="password" handleChange={handleChange} />
                  {/* <Input className="text-white" placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} /> */}
                  {/* <Input className="text-white" placeholder="Enter Message" name="message" type="text" handleChange={handleChange} /> */}
                </div>
                <div className="h-[1px] w-full bg-gray-400 my-2" />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 w-80 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">
                  Login
                </button>
              </div>
            </div>
            <div className="transition-opacity hover:transition h-full flex flex-row w-4/5 justify-center">
              <img src={logo} alt="logo" className=" w-2/5 cursor-pointer blue-glassmorphism" />
              
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;
