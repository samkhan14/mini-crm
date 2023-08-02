import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const EmployeesList = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/employees");
      console.log("API Response:", response.data);
      setEmployeesData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching employees:", error);
      setEmployeesData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/employees/${id}`).then(function(response){
      console.log(response.data);
      alert("Successfully Deleted");
      // After deleting, you may want to refresh the employees list
      fetchEmployees();
    }).catch(function (error) {
      console.log(error);
      alert("Error deleting employee.");
    });
  };

  const getRandomCompanyName = () => {
    const companyNames = [
      "Company A",
      "Company B",
      "Company C",
      "Company D",
      "Company E",
      // Add more company names as needed
    ];
    const randomIndex = Math.floor(Math.random() * companyNames.length);
    return companyNames[randomIndex];
  };

  return (
    <>
    <Header/>
      <div className="container container_overflow">
        <div className="row">
          <div className="col-12">
            <h5 className="mb-4">All Employees</h5>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Sr.No</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Company</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col" width="200">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employeesData.map((employee, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{employee.first_name}</td>
                      <td>{employee.last_name}</td>
                      <td>{getRandomCompanyName()}</td>
                      <td>{employee.email}</td>
                      <td>{employee.phone}</td>
                      <td>
                        <Link to={`/editEmployee/${employee.id}/edit`} className="btn btn-success mx-2">Edit</Link>
                        <button onClick={() => deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default EmployeesList;
