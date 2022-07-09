import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [credentials, setcredentials] = useState({email:"", password:""});
    let navigate = useNavigate();
    useEffect(()=> {
        if(localStorage.getItem('token'))
        {
            navigate("/");
        }
        // eslint-disable-next-line
    },[]);

    const onChange = (e)=>{
        setcredentials({...credentials, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        if(json.status === 1)
        {
            // Redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/");
        }
        else {
            alert("Please enter valid credentials");
        }
    }
    return (
        <div className='container login-container my-5'>
            <h2 className='mb-4 text-center'>Login</h2>
            <form onSubmit={handleSubmit} method="post">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Login</button>
            </form>
        </div>
    )
}

export default Login
