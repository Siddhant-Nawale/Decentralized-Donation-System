import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import {useNavigate } from 'react-router-dom';
import {
    onSnapshot,
    collection,
    doc,
    setDoc,
  } from 'firebase/firestore';
import app from '../../firebase';
import db from '../../firebase';
import 'firebase/storage';
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


const Charity = () =>{
    const [formDataLogin, setformDataLogin] = useState({ Name: "",Address: ""});
    const [file, setFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const navigate = useNavigate(); 
    

    const handleChange = (e, name) => {
    // console.log(name);
    setformDataLogin((prevState) => ({ ...prevState, [name]: e.target.value }));
    console.log(formDataLogin);
    };
    
    const handleChangeforfile = (e, name) => {
      // console.log(name);
      setFile(e.target.files[0]);
      setIsFilePicked(true);
      console.log(File);
      };

    const handleSubmit = (e, name) => {
        const { Name, Address} = formDataLogin;

        e.preventDefault();
    
        if (!Name || !Address || !isFilePicked) return;

        // upload();
        window.location.reload();

    };
    const upload = async() =>{
      const { Name, Address} = formDataLogin;

      var storage = app.storage();
      if(isFilePicked == false)
      return;
      storage.ref(`/images/${file.name}`).put(image).on("state_changed" , alert("success") , alert);
        // const docSnap = await getDoc(docRef);
        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data());
        //     if(docSnap.data().Uname == formDataLogin.UserName && docSnap.data().Password == formDataLogin.Password){
        //         console.log("Authenticated");

        //         // navigate("/UserHome");
        //     }
        //   } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");
        //   }
        
    }

    return (
      <div className="gradient-bg-welcome  h-fit ">
        <div className="h-screen">
          <Navbar/>
          <div className="flex flex-row mt-5 flex-1 text-white w-full md:justify-center">
            <div className="w-1/2 flex flex-row justify-center">
              <div className = "p-5 mt-20 ml-40 sm:w-90 h-96 w-full flex flex-col justify-start items-left blue-glassmorphism w-96">
                <div className="mt-3 mb-5  items-center "><h1 className=" text-5xl">Upload Report</h1></div>
                <div className = "my-0.5">
                  <Input placeholder="Name" name="Name" type="text" handleChange={handleChange} />
                  <Input placeholder="Address" name="Address" type="text" handleChange={handleChange} />
                  <Input placeholder="File" name="file" type="file" handleChange={handleChangeforfile} />
                  {/* <Input className="text-white" placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} /> */}
                  {/* <Input className="text-white" placeholder="Enter Message" name="message" type="text" handleChange={handleChange} /> */}
                </div>
                <div className="h-[1px] w-full bg-gray-400 my-2" />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 w-80 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">
                  Upload
                </button>
              </div>
            </div>
            <div className="transition-opacity  hover:transition h-full flex flex-row w-1/2 justify-center">
              <div className="bg-orange-900 w-3/5 h-[35rem] border-2 white-glassmorphism" >
              <div className="bg-orange-900 flex justify-left pl-5  items-center w-full h-[5rem] cursor-pointer blue-glassmorphism" >
                <h1 className="justify-center  items-center ">Report.pdf</h1>
              </div>
              </div>  
              
            </div>
          </div>
        </div>
      </div>
    );
};

export default Charity;
