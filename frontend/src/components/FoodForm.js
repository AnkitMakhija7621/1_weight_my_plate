import { useState } from "react"
import { useFoodsContext } from "../hooks/useFoodsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { set } from "date-fns"
import axios, * as others from 'axios';
// import Alert from 'react-bootstrap/Alert';
import AlertDismissible from '../components/AlertDismissible';
import opimage from './prediction.jpg';
// import { useState } from 'react';
// import Alert from 'react-bootstrap/Alert';
// import Button from 'react-bootstrap/Button';

const fs = require("fs");




// const axios = require("axios");

const FoodForm = () => {
  const filepath = '/home/a-max/Desktop/'
  const { dispatch } = useFoodsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [image, setImage] = useState('')
  const [showimage, setShowImage] = useState(false)
  
  
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  var cl;




  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(image+"\n")

    if (!user) {
      setError('You must be logged in');
      return;
    }

    try {

      console.log("image: "+image+"\n")

      const response = await fetch('/api/foods', {
        method: 'POST',
        body: JSON.stringify({
          image: image
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }
      if (response.ok) {
        setShowImage(true);
        setTitle('');
        setLoad('');
        setReps('');
        setError(null);
        setEmptyFields([]);
        dispatch({ type: 'CREATE_WORKOUT', payload: json });

        // alert("Food added successfully")
        // <AlertDismissible text="ho gaya" />

      }
    } catch (error) {
      console.log("error\n")
      console.log(error.message);
      // setShow(true);
      
    }
  };




  return (
    <form className="create" 
    onSubmit={handleSubmit}
    >
      <h3>Add new meal</h3>

      <label>Upload Image:</label>
      <input 
        type="file"
        // onChange={handleImg}
        onChange={(e) => {
          // const str = e.target.value
          var arr = e.target.value.split("\\");
          console.log(arr[arr.length-1])
          const fileurl = filepath+arr[arr.length-1]
          
          setImage(fileurl)
          console.log("file url set - "+image)
        }}
        // value={title}
        // className={emptyFields.includes('title') ? 'error' : ''}
      />




      <button >Upload</button><br></br>
      {showimage ? <img src={opimage} alt="uploaded image"/> : null}
      {/* <img src={image} alt="uploaded image"/> */}
      {error && <div className="error">{error}</div>}
      

    </form>
  )
}

export default FoodForm