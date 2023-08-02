import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    company_id: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const updateEmployee = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/employees/${id}`,
        inputs
      );

      setMessage(response.data.message);
      console.log(response);
      setTimeout(() => {
        navigate("/employees");
      }, 1000);
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred while updating the employee.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEmployee();
  };

  useEffect(() => {
    getEmployee();
  }, []); // Make sure to provide an empty dependency array to avoid infinite loops

  function getEmployee() {
    axios
      .get(`http://127.0.0.1:8000/api/employees/${id}`)
      .then(function (response) {
        console.log(response);
        setInputs(response.data.data); // Make sure the response data structure matches the `inputs` state
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setMessage("An error occurred while fetching the employee data.");
      });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Header/>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mt-4">
            <h5 className="mb-4">Edit Employee</h5>
            {message && (
              <p className="text-success">
                <b>{message}</b>
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-3">First Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    value={inputs.first_name}
                    className="form-control"
                    name="first_name"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Last Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    value={inputs.last_name}
                    className="form-control"
                    name="last_name"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Company</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    value={inputs.company_id}
                    className="form-control"
                    name="company_id"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Email</label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    value={inputs.email}
                    className="form-control"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Phone</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    value={inputs.phone}
                    className="form-control"
                    name="phone"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3"></label>
                <div className="col-sm-9">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default EditEmployee;
