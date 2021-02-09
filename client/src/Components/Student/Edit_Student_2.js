import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams,Link } from "react-router-dom";
import moment from 'moment';

const Edit_Student = () => {

    let history = useHistory();
    const { id } = useParams();
    console.log("id",id);

    const[student,setStudent]=useState({
        first_name : '',
        last_name : '',
        email_id : '',
        Department : '',
        contact_no : '',
        address : '',
        birthday : '',
        graduation_year : '',
        profile : null,
        profile_img : null,
        password :''
    })

    const { first_name,last_name,email_id,Department,contact_no,address,birthday,graduation_year,profile,password} = student;

    const onInputChange = e => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const onInputChange_Student_Profile = e =>{
        if(e.target.files.length > 0){
            setStudent({...student,[e.target.name] : e.target.files[0]})
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:3100/studentdata/Editstudent/${id}`);
        setStudent(result.data);
        //console.log("da",result.data);
    };


    const onhandlesubmit = async e => {
        e.preventDefault();

        const bodyFormData = new FormData();
        bodyFormData.append("first_name",first_name);
        bodyFormData.append("last_name",last_name);
        bodyFormData.append("email_id",email_id);
        bodyFormData.append("Department",Department);
        bodyFormData.append("contact_no",contact_no);
        bodyFormData.append("address",address);
        bodyFormData.append("birthday",birthday);
        bodyFormData.append("graduation_year",graduation_year);
        if(profile != null)
        {
            bodyFormData.append("profile",profile);
        }
        bodyFormData.append("password",password);

        axios.put(`http://localhost:3001/UpdateStudent/${id}`, bodyFormData);
        history.push("/");
    };
    
    return ( 
        <div className="container p-md-5" >
                <div className="w-80 mx-auto shadow-lg p-5 mb-5 bg-white" style={{borderRadius:'60px'}}>
                    <div className="row" style={{display:'inline-grid'}}>
                        <h1 className="text-center mb-4"><b>EDIT STUDENT</b></h1>
                        <Link className="btn btn-primary" to="/liststudent">BACK PAGE</Link>
                    </div>
                    <hr/>
                    <img src={'/uploads/' +profile} style={{width:'200px',height:'200px',borderRadius:'200px',margin:'0 0 10px 0',border:'10px double #007bff'}}  />
                    <hr/>

                    <form onSubmit={e => onhandlesubmit(e)}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="name">First Name</label>
                                <input type="text" 
                                    className="form-control"  
                                    placeholder="First Name"
                                    required
                                    name="first_name"
                                    value={first_name}
                                    onChange={e => onInputChange(e)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="name">Last Name</label>
                                <input type="text" 
                                    className="form-control" 
                                    placeholder="Last Name"
                                    required
                                    name="last_name"
                                    value={last_name}
                                    onChange={e => onInputChange(e)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="name">Email</label>
                                <input type="email" 
                                    className="form-control"  
                                    placeholder="Email"
                                    required
                                    name="email_id"
                                    value={email_id}
                                    onChange={e => onInputChange(e)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="name">Department</label>
                                <input type="text" 
                                    className="form-control" 
                                    placeholder="Department"
                                    required
                                    name="Department"
                                    value={Department}
                                    onChange={e => onInputChange(e)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="name">Contact No</label>
                                <input type="text" 
                                    className="form-control"  
                                    placeholder="Contact No"
                                    required
                                    name="contact_no"
                                    title="Contact No should be 10 Digit only"
                                    pattern="[0-9]{10}"
                                    value={contact_no}
                                    onChange={e => onInputChange(e)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="name">birthday</label>
                                <input type="date" 
                                    className="form-control" 
                                    placeholder="birthday"
                                    required
                                    name="birthday"
                                    value={moment(birthday).format('YYYY-MM-DD')}
                                    onChange={e => onInputChange(e)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Address</label>
                            <textarea className="form-control" 
                                rows="3" 
                                placeholder="Address"
                                required
                                name="address"
                                value={address}
                                onChange={e=> onInputChange(e)}
                            ></textarea>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="name">Graduation Year</label>
                                <input type="text" 
                                    className="form-control" 
                                    placeholder="Graduation year"
                                    required
                                    title="Year should be 4 Digit only"
                                    pattern="[0-9]{4}"
                                    name="graduation_year"
                                    value={graduation_year}
                                    onChange={e => onInputChange(e)}
                                />
                            </div>
                            {/* <div className="form-group col-md-4">
                                <label>State</label>
                                <select className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div> */}
                            <div className="form-group col-md-6">
                                <label htmlFor="file">Profile</label>
                                <input type="file" 
                                    className="form-control"
                                    accept=".png, .jpg, .jpeg"
                                    required
                                    name="profile"
                                    onChange={e => onInputChange_Student_Profile(e)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
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
                        <button type="submit" style={{width:'200px'}} className="btn btn-outline-primary">Submit</button>
                    </form>
                </div>
            </div>
    );
}
 
export default Edit_Student;