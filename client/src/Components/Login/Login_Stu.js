import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
//import AuthApi from '../utils/AuthApi';

const Login_stu = () => {

   //let history = useHistory();

    const [student, setStudent] = useState({
        email_id: '',
        password: '',
    })

    //const authApi = React.useContext(AuthApi);

    // const token = localStorage.getItem('Token_Key');
    // if(token==null)
    // {
    //     authApi.setAuth(false);
    // }
    
    const { email_id, password } = student;

    const onInputChange = e => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const onhandlesubmit = e => {
        e.preventDefault();
        
        const bodyFormData ={
            email_id : email_id,
            password : password
        }

        console.log("data",bodyFormData);
        // const bodyFormData = new FormData();
        // bodyFormData.append("email_id", email_id);
        // bodyFormData.append("password", password);

        axios.post("http://localhost:3100/logindata/Login", bodyFormData).then((result) => {
            console.log("result=>", result)
            alert(result.data.message)
            //alert(result.data.session)
            window.location.href="/home"
            localStorage.setItem("Token_Key",result.data.session)
            //authApi.setAuth(true);
        }).catch((error) => {
            window.location.href="/"
            alert("Incorrect Username and/or Password!")
        })
    }

    return (
        <div className="container py-4" >
            <div className="w-50 mx-auto shadow-lg p-5 mb-5 bg-white" style={{ borderRadius: '60px',margin:'125px 0 0 0'}}>
                <h1 className="text-center mb-4"><b>Login</b></h1>
                <form onSubmit={e => onhandlesubmit(e)}>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="name">Email</label>
                            <input type="email"
                                className="form-control"
                                placeholder="Example@gmail.com"
                                required
                                name="email_id"
                                value={email_id}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="name">Password</label>
                            <input type="password"
                                className="form-control"
                                placeholder="***********"
                                onChange={e => onInputChange(e)}
                                required
                                name="password"
                                value={password}
                                autoComplete="current-password"
                            />
                        </div>
                    </div>
                    <button type="submit" style={{ width: '200px',margin:'20px 0 0 120px'}} className="btn btn-outline-primary">LOGIN</button>
                </form>
            </div>
        </div>
    );
}
export default Login_stu;