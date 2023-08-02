import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

export default function AddEmployee() {
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/companies");
      setCompanies(response.data.data); // Extract the array of companies from the response
      setLoading(false);
    } catch (error) {
      console.log("Error fetching companies:", error);
      setLoading(false);
      setCompanies([]); // Set companies to an empty array in case of an error
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const uploadEmployee = async () => {
    const selectedCompany = companies.find((c) => c.name === company);
    if (!selectedCompany) {
      setMessage("Invalid company selected");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("company_id", selectedCompany.id); // Use the company ID instead of name
    formData.append("email", email);
    formData.append("phone", phone);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/employees",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("API response:", response.data);
      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/employees");
      }, 1000);
    } catch (error) {
      console.log("API error:", error);
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred while submitting the form.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", {
      first_name,
      last_name,
      company,
      email,
      phone,
    });
    await uploadEmployee();
  };

  return (
    <>
    <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8 mt-4">
            <h5 className="mb-4">Add Employee</h5>
            <p className="text-warning">{message}</p>

            {loading ? (
              <div>Loading...</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                  <label className="col-sm-3">First Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3">Last Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3">Company</label>
                  <div className="col-sm-9">
                    <select
                      className="form-control"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    >
                      <option value="">Select a Company</option>
                      {Array.isArray(companies)
                        ? companies.map((company) => (
                            <option key={company.id} value={company.name}>
                              {company.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3">Email</label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="col-sm-3">Phone</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setPhone(e.target.value)}
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
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
