import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./Component/Login";
import { Logout } from "./Component/Logout";
import Home from "./Component/Home";
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from "./Component/Header";
import { AddCompany } from "./Component/Company/AddCompany";
//  import Footer from './Component/Footer';
import EditCompany from "./Component/Company/EditCompany";
import AddEmployee from "./Component/Employee/AddEmployee";
import EmployeesList from "./Component/Employee/EmployeeList";
import EditEmployee from "./Component/Employee/EditEmployee";

function App() {

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem("user") !== null;
  };
 
  return (
    <div className="App">
      <Routes>
        {/* All Routes defined with authenticated*/}
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={isAuthenticated() ? <Home /> : <Navigate to="/" />} />
        <Route exact path="/addCompany" element={isAuthenticated() ? <AddCompany /> : <Navigate to="/" />} />
        <Route exact path="editCompany/:id/edit" element={isAuthenticated() ? <EditCompany /> : <Navigate to="/" />} />
        <Route exact path="/addEmployee" element={isAuthenticated() ? <AddEmployee /> : <Navigate to="/" />} />
        <Route exact path="/employees" element={isAuthenticated() ? <EmployeesList /> : <Navigate to="/" />} />
        <Route exact path="editEmployee/:id/edit" element={isAuthenticated() ? <EditEmployee /> : <Navigate to="/" />} />
        <Route exact path="/logout" element={isAuthenticated() ? <Logout />: <Navigate to="/" />} />
      </Routes>    
  
   
    </div>
  );
}

export default App;
