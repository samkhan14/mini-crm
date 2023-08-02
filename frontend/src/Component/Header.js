import React from "react";
import { Link } from "react-router-dom";


function Header() {
//get data from localstorage for link hide/show
let user = JSON.parse(localStorage.getItem('user'))

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light main_box">
        <div className="container">
          {/* logo */}
          <Link className="navbar-brand logo_h" to="/home">
            CRM
          </Link>
          {/* hamburger menu */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>

          <div
            className="collapse navbar-collapse offset"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addCompany">
                  Add Company
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addEmployee">
                  Add Employee
                </Link>
              </li>     
              <li className="nav-item">
                <Link className="nav-link" to="/employees">
                  All Employees
                </Link>
              </li>
              {/* check if user data has in a localStorage then show link */}
              { localStorage.getItem('user') ?             
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                 Logout
                </Link>
              </li> : null
               }                      
            </ul>
            {/* show the name of admin when login */}
            <span class="bg-dark text-white navbar-text p-3">
            Welcome {user.userDetails.name}
      </span>
           
          </div>
        </div>
      </nav>
    </>
  );
}
export default Header;
