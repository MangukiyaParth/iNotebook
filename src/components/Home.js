import React, { useEffect } from 'react';
import Notes from './Notes';
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  let navigate = useNavigate();
  useEffect(()=> {
    if(localStorage.getItem('token'))
    {}
    else
    {
      navigate("/login");
    }
    // eslint-disable-next-line
  },[]);
  return (
    <div className='container'>
      <Notes showAlert={props.showAlert}/>
    </div>
  )
}

export default Home
