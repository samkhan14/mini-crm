import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CompaniesList() {
  // vars for companies and pagination
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    fetchCompanies();
  }, [currentPage]); // Fetch companies whenever currentPage changes

  const fetchCompanies = () => {
    const perPage = 3; // Set the number of companies to show per page
    axios
      .get(`http://127.0.0.1:8000/api/companies?page=${currentPage}&per_page=${perPage}`)
      .then((response) => {
        console.log(response.data);
        setCompanies(response.data.data);
        setTotalPages(response.data.last_page);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // delete company logic
  const deleteCompany = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/companies/${id}`)
      .then(function (response) {
        console.log(response.data);
        alert("Successfully Deleted");
        // Fetch companies after deletion to reflect changes
        fetchCompanies();
      });
  };

  // hadnling the pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // data view
  return (
    <>
      <div className="container container_overflow">
        <div className="row">
          <div className="col-12">
            <h5 className="mb-4">All Companies</h5>
            <p className="text-danger"> </p>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Sr.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Logo</th>
                  <th scope="col">Website</th>
                  <th scope="col" width="200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {companies.map((pdata, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{pdata.name}</td>
                    <td>{pdata.email}</td>
                    <td>
                      <img src={pdata.logo} alt="" height={50} width={90} />
                    </td>
                    <td>{pdata.website}</td>
                    <td>
                      <Link
                        to={`/editCompany/${pdata.id}/edit`}
                        className="btn btn-success mx-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteCompany(pdata.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompaniesList;
