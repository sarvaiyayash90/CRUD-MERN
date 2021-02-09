import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


// start funcation
const Profile = () => {

    const [login_data,set_login] = useState({
        username : '',
        email_id : '',
        password : '',
        profile_img : null
    });

    useEffect(() => {
        load_login_profile_data();
    },[])

    const id = localStorage.getItem('Token_Key')
    //console.log("id",id);
    //console.log("http://localhost:3100/logindata/viewloginprofile/"+id);

    const load_login_profile_data = async () => {
        const res = await axios.get(`http://localhost:3100/logindata/viewloginprofile/${id}`)
        set_login(res.data);
    }

    return (
        <div className="container py-4">
            <div className="w-80 mx-auto shadow-lg p-5 mb-5 bg-white" style={{borderRadius:'60px'}}>

            <div className="col-12 row">
                <div style={{margin:'0 595px 0 0'}}>
                    <Link className="btn btn-primary btn-lg" to="/home"><i class="fas fa-chevron-left" style={{ color: 'white'}}></i> BACK PAGE</Link>
                </div>
                <div>
                    {/* <h1 className="text-center mb-4"><b>My profile</b></h1> */}
                    <h1><b>MY PROFILE</b></h1>
                </div>
            </div>

            {/* <div className="row" style={{display:'inline-grid'}}>
                <h1 className="text-center mb-4"><b>My profile</b></h1>
                <Link className="btn btn-primary" to="/home">BACK PAGE</Link>
            </div> */}

            <hr/>
            <h1 className="display-4">User Id: {id}</h1>
            <hr />
            <img  style={{width:'200px',height:'200px',borderRadius:'200px',margin:'0 0 10px 0',border:'10px double #007bff'}}   src={'/admin/' + login_data.profile_img} />

            <table class="table table-bordered" >
                <tbody style={{fontWeight:'bold'}}>
                    <tr><td style={{width:'505px'}}>Username </td><td> {login_data.username}</td></tr>
                    <tr><td style={{width:'505px'}}>Email Id </td><td>{login_data.email_id}</td></tr>
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default Profile;
//EOF funcation

