import React, {  } from "react";
import CompaniesList from "./Company/CompaniesList";
import Header from "./Header";
import Footer from './Footer';
 
function Home()
{
    
    return(
        <>
        <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <h1 className="mb-5 mt-5">CRM Company & Employees</h1>
                    </div>
                </div>

                <CompaniesList />
            </div>
        <Footer/>    
        </>
    );
}
export default Home;