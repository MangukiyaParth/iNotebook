import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const handlelogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
              <Link className="navbar-brand" to="/">iNootbook</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className={`nav-link ${(location.pathname === '/') ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item"><Link className={`nav-link ${(location.pathname === '/about') ? 'active' : ''}`} to="/about">About</Link></li>
                </ul>
                <div className="d-flex">
                  <Link className={`btn btn-outline-primary btn-sm mx-1 ${localStorage.getItem('token') ? 'd-none' : ''}`} to="/login" role="button"> Login </Link>
                  <Link className={`btn btn-outline-primary btn-sm mx-1 ${localStorage.getItem('token') ? 'd-none' : ''}`} to="/signup" role="button"> Signup </Link>
                  <button className={`btn btn-outline-primary btn-sm mx-1 ${localStorage.getItem('token') ? '' : 'd-none'}`} onClick={handlelogout}> Logout </button>
                </div>
              </div>
          </div>
        </nav>
    </div>
  )
}

export default Navbar