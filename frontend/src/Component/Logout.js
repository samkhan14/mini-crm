import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Logout = () => {

const navigate = useNavigate();

function logout(){
    localStorage.clear();
    navigate("/");
}

useEffect(()=> {
    logout();
},[]);


    return (
    <div>Logout</div>
  )
}
