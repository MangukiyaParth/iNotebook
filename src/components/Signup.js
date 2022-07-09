import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [credentials, setcredentials] = useState({name:"", email:"", password:"", cpassword:""});
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
        const {name, email, password, cpassword} = credentials;
        if(password === cpassword)
        {
            const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name:name, email:email, password:password})
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
        else {
            alert("Please enter valid confirm password");
        }
    }

    return (
        <div className='container login-container my-5'>
            <h2 className='mb-4 text-center'>Signup</h2>
            <form onSubmit={handleSubmit} method="post">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} required aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary mt-2 text-end">Signup</button>
            </form>
        </div>
    )
}

export default Signup
