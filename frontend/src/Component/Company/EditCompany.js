import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditCompany() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    website: "",
    logo: "",
  });
  const [loading, setLoading] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const updateCompany = async () => {
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", inputs.name);
      formData.append("email", inputs.email);
      formData.append("website", inputs.website);
      formData.append("logo", inputs.logo);

      const response = await axios.post(
        `http://127.0.0.1:8000/api/companies/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(response.data.message);
      console.log(response);
      setTimeout(() => {
        navigate("/home");
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
        setMessage("An error occurred while updating the company.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCompany();
  };

  useEffect(() => {
    getCompany();
  }, []); // Make sure to provide an empty dependency array to avoid infinite loops

  function getCompany() {
    axios
      .get(`http://127.0.0.1:8000/api/companies/${id}`)
      .then(function (response) {
        console.log(response);
        setInputs(response.data.data); // Make sure the response data structure matches the `inputs` state
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setMessage("An error occurred while fetching the company data.");
      });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mt-4">
            <h5 className="mb-4">Edit Company</h5>
            {message && (
              <p className="text-success">
                <b>{message}</b>
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-3">Name</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    value={inputs.name}
                    className="form-control"
                    name="name"
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
                <label className="col-sm-3">Website</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    value={inputs.website}
                    className="form-control"
                    name="website"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3">Company Logo</label>
                <div className="col-sm-9">
                  {inputs.logo && (
                    <img
                      src={`http://127.0.0.1:8000/storage/${inputs.logo}`}
                      alt=""
                      height={300}
                      width={300}
                    />
                  )}
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setInputs({ ...inputs, logo: e.target.files[0] })
                    }
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
    </>
  );
}

export default EditCompany;
