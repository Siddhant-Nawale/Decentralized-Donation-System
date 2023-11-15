import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import {useNavigate } from 'react-router-dom';
import {
    onSnapshot,
    collection,
    doc,
    setDoc
  
  } from 'firebase/firestore';
import db from '../firebase';
import { Navbar } from "../components";
import logo from "../../images/img3.jpg";


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


const RegisterCharity = () =>{
    const [formDataLogin, setformDataLogin] = useState({ Name: "",AccountAddress: ""});
    const [toggle,settoggle] = useState(false);
    const navigate = useNavigate(); 

    const handleChange = (e, name) => {
    // console.log(name);
    setformDataLogin((prevState) => ({ ...prevState, [name]: e.target.value }));
    console.log(formDataLogin);
    };

    const handleSubmit = (e, name) => {
        const { Name, AccountAddress} = formDataLogin;

        e.preventDefault();
    
        if (!Name || !AccountAddress ) return;

        Register();
    };
    const Register = async() =>{
      const { Name, AccountAddress} = formDataLogin;

        const colletionRef = collection(db, 'Charities');
        const docRef = doc(db, "Charities", Name);
        await setDoc(docRef, {
          Name: Name,
          Address : AccountAddress,
        });
        navigate("/UserHome");
    }


    const Isdone=()=>{

      if(toggle == true){
        return(
          <div>
            <button className="bg-sky-800">Done</button>
          </div>
        );
      }else{
        return(<div/>);
      }
    }

    const handleChangeforfile = (e, name) => {
      // console.log(name);
      setFile(e.target.files[0]);
      setIsFilePicked(true);
      console.log(File);
      };

    return (
      <div className="gradient-bg-welcome  h-fit ">
        <div className="h-fit">
          <Navbar/>
          <div className="flex flex-row mt-5 flex-1 text-white w-full md:justify-center">
            <div className="w-1/2 flex flex-row justify-center">
              <div className = "p-5 mb-20 ml-40 sm:w-90  w-full flex flex-col justify-start items-left blue-glassmorphism w-96 h100">
                <div className="mt-3 mb-5  items-center "><h1 className=" text-5xl">Register Charity</h1></div>
                <div className = "my-0.5">
                  <Input placeholder="Name" name="Name" type="text" handleChange={handleChange} />
                  <Input placeholder="Account Address" name="AccountAddress" type="text" handleChange={handleChange} />
                  <textarea placeholder="Details About Charity"  className="my-3 rounded-sm p-2 w-80 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"></textarea>
                  <p className="stext">Government Certificate:</p>
                  <Input placeholder="File" name="file" type="file" handleChange={handleChangeforfile} />
                  <Input placeholder="Number" name="Number" type="text" handleChange={handleChange} />
                  <Input placeholder="Address" name="Address" type="text" handleChange={handleChange} />



                  {/* <Input className="text-white" placeholder="Password" name="Password" type="password" handleChange={handleChange} /> */}
                  {/* <Input className="text-white" placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} /> */}
                  {/* <Input className="text-white" placeholder="Enter Message" name="message" type="text" handleChange={handleChange} /> */}
                </div>
                <div className="h-[1px] w-full bg-gray-400 my-2" />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 w-80 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">
                  Register Charity
                </button>
                <Isdone/>
              </div>
            </div>
            <div className="transition-opacity mt-10 hover:transition h-full flex flex-row w-1/2 justify-center">
              <img src={logo} alt="logo" className=" w-2/5 cursor-pointer blue-glassmorphism" />
              
            </div>
          </div>
        </div>
      </div>
    );
  
};

export default RegisterCharity;
