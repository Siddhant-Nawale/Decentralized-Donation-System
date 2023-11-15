import React, { useState, useEffect, Fragment, useContext } from 'react';
import {
  onSnapshot,

  collection,

} from 'firebase/firestore';
import db from '../firebase';

function Fbtrial() {
  const colletionRef = collection(db, 'Charities');
  console.log("hii");
  const [Charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(false);

  // var items = [];

  //REALTIME GET FUNCTION
  useEffect(() => {
    setLoading(true);
    var items = [];
    const unsub = onSnapshot(colletionRef, (querySnapshot) => {
      
      querySnapshot.forEach((doc) => {
      // console.log(doc.data());

        items.push(doc.data());
      });
      setCharities(items);
      setLoading(false);
    });  console.log("hhhhh"); 
  console.log(items);
    return () => {
      unsub();
    };

  }, []);
 

    
  return (
    <Fragment>
        <div>
          {Charities.map((cha) => (
        <div className="cha" >
          <h2>{cha.Name}</h2>
          <p>{cha.Address}</p>
          {/* <div>
            <button onClick={() => deleteSchool(school)}>X</button>
            <button onClick={() => editSchool(school)}>Edit Score</button>
          </div> */}
        </div>
      ))}
      </div>
      
    </Fragment>
  );
}

export default Fbtrial;
