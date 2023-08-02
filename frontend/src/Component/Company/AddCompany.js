import React, { useState } from "react"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
 
export function AddCompany() {
    // make some vars for update state and inital state
    const navigate = useNavigate();  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [logo, setLogo] = useState('');
    const [website, setWebsite] = useState('');
    const [message, setMessage] = useState('');
  
    // add company data logic
    const companyData = async () => {
      console.log(logo);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('logo', logo);
      formData.append('website', website);
      
      // calling API
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/companies", formData, {
          headers: { 'Content-Type': "multipart/form-data" },
        });
  
        console.log("Response", response.data);
        setMessage(response.data.message);
        
        setTimeout(() => {
          navigate('/home');
        }, 1000);

      } catch (error) {
        if (error.response) {
          console.log("Error Response", error.response.data);
          setMessage(error.response.data.message);
        } else {
          console.log("Error", error.message);
          setMessage("An error occurred while submitting the form.");
        }
      }
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await companyData();
    }  
   
    // FORM VIEW
    return(
   <>
   <Header/>
        <div className="container">
            <div className="row">
              <div className="col-md-8 mt-4">
                <h5 className="mb-4">Add Company </h5> 
                <p className="text-warning">{ message}</p>                              
                 
                    <form onSubmit={ handleSubmit}>             
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Company Name </label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={ (e)=>setName(e.target.value)}/>
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Email </label>
                    <div className="col-sm-9">
                    <input type="email" className="form-control" onChange={(e)=>setEmail(e.target.value)}  />
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label  className="col-sm-3">Upload Logo</label>
                    <div className="col-sm-9">
                    <input type="file" className="form-control" onChange={(e)=>setLogo(e.target.files[0])} />
                    </div>
                    </div>

                    <div className="mb-3 row">
                    <label  className="col-sm-3">Website </label>
                    <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={ (e)=>setWebsite(e.target.value)}/>
                    </div>
                    </div>
 
                    <div className="mb-3 row">
                    <label className="col-sm-3"></label>
                    <div className="col-sm-9">
                    <button type="submit" className="btn btn-success">Submit</button>
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
// export default AddCompany;