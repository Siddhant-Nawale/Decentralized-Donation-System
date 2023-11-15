import React, { useState, useEffect, Fragment, useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

import {
  onSnapshot,

  collection,

} from 'firebase/firestore';
import db from '../firebase';

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  // //////////////////////////////
  const colletionRef = collection(db, 'Charities');
  // console.log("hii");
  const [Charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(false);

  //REALTIME GET FUNCTION
  useEffect(() => {
    setLoading(true);
    var items = [];
    const unsub = onSnapshot(colletionRef, (querySnapshot) => {
      
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setCharities(items);
      setLoading(false);
    });
  console.log(items);
    // return () => {
    //   unsub();
    // };

  }, []);


  // //////////////////////////////
  var selectValue;
  const setaddr = (e,name) =>{
    // this.setState({selectValue:e.target.value});
    // console.log(selectValue)

    handleChange(e, "addressTo")
  }

  const Accdetails = () =>{
  const { transactions, currentAccount, Accounts,currentbal } = useContext(TransactionContext);
    console.log("Accounts");
    console.log(Accounts);
    // border-2
    return(
      <div className="flex flex-1 w-full flex-col md:p-0 text-white">
        {currentAccount ? (
          <h1 className="text-white flex-1  text-lg my-2">
            <div className="text-center text-3xl">
            <u>Account Details </u>
            </div>
            <br/>
            Acc Address : {shortenAddress(currentAccount)}
            <br/>
            Balance : {currentbal}
            
          </h1>
  

        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account
            
          </h3>
        )}
      </div>
    );
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
          DECENTRALIZED DONATION <br/> PLATFORM
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
          ______________________________________________________
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          {/* <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div> */}
          <div className="flex flex-col flex-1 w-2/3 text-white items-center justify-start w-full mf:mt-0 mt-10">
            {<Accdetails/>}
          </div>
        </div>

        <div className="flex ustify-between md:p-0 py-12 px-4">

          

          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            <div className="p-3 flex justify-end  items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
              <div className="flex justify-between flex-col w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <SiEthereum fontSize={21} color="#fff" />
                  </div>
                  <BsInfoCircle fontSize={17} color="#fff" />
                </div>
                <div>
                  <p className="text-white font-light text-sm">
                    {shortenAddress(currentAccount)}
                  </p>
                  <p className="text-white font-semibold text-lg mt-1">
                    |Ethereum|
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              {/* <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} /> */}
              
              <select className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism" name="addressTo" id="Charity" onChange={(e) => handleChange(e, "addressTo")}>
              {Charities.map((cha) => (
                <option className="text-black" value={cha.Address}>{cha.Name}</option>
              ))}
              </select>
              {setaddr}
              
              <Input className="text-white" placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
              <div className="hidden text-white"><Input className="invisible text-white" placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} /></div>
              <Input className="text-white" placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

              <div className="h-[1px] w-full bg-gray-400 my-2" />

              {isLoading
                ? <Loader />
                : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                  >
                    Send now
                  </button>
                )}
            </div>

          </div>

        </div>
        
      </div>
    </div>
  );
};

export default Welcome;
