import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory,Link } from "react-router-dom";
// import {Button,Form} from 'react-bootstrap';

// funcation start
// const Create_Student = () => {
//     let history = useHistory();

//     const[student,setStudent]=useState({
//         first_name : '',
//         last_name : '',
//         email_id : '',
//         Department : '',
//         contact_no : '',
//         address : '',
//         birthday : '',
//         graduation_year : '',
//         profile : null,
//         password :''
//     })

//     const { first_name,last_name,email_id,Department,contact_no,address,birthday,graduation_year,profile,password} = student;

//     const onInputChange = e => {
//         setStudent({ ...student, [e.target.name]: e.target.value });
//     };

//     const onInputChange_Student_Profile = e => {
//         setStudent({ ...student, [e.target.name]: e.target.files[0] });
//     };

//     const onhandlesubmit = async e =>{
//         e.preventDefault();    
//         const bodyFormData = new FormData();
//         bodyFormData.append("first_name",first_name);
//         bodyFormData.append("last_name",last_name);
//         bodyFormData.append("email_id",email_id);
//         bodyFormData.append("Department",Department);
//         bodyFormData.append("contact_no",contact_no);
//         bodyFormData.append("address",address);
//         bodyFormData.append("birthday",birthday);
//         bodyFormData.append("graduation_year",graduation_year);
//         bodyFormData.append("profile",profile);
//         bodyFormData.append("password",password);
//         await axios.post("http://localhost:3100/studentdata/Createstudent",bodyFormData);
//         history.push("/liststudent");
//     }

//     return ( 
//         <div className="container p-md-5" >
//                 <div className="w-80 mx-auto shadow-lg p-5 mb-5 bg-white" style={{borderRadius:'60px'}}>
//                 <h1 className="text-center mb-4"><b>ADD STUDENT</b></h1>
//                     <form onSubmit={e => onhandlesubmit(e)}>
//                         <div className="form-row">
//                             <div className="form-group col-md-6">
//                                 <label htmlFor="name">First Name</label>
//                                 <input type="text" 
//                                     className="form-control"  
//                                     placeholder="First Name"
//                                     required
//                                     name="first_name"
//                                     value={first_name}
//                                     onChange={e => onInputChange(e)}
//                                 />
//                             </div>
//                             <div className="form-group col-md-6">
//                                 <label htmlFor="name">Last Name</label>
//                                 <input type="text" 
//                                     className="form-control" 
//                                     placeholder="Last Name"
//                                     required
//                                     name="last_name"
//                                     value={last_name}
//                                     onChange={e => onInputChange(e)}
//                                 />
//                             </div>
//                         </div>
//                         <div className="form-row">
//                             <div className="form-group col-md-6">
//                                 <label htmlFor="name">Email</label>
//                                 <input type="email" 
//                                     className="form-control"  
//                                     placeholder="Email"
//                                     required
//                                     name="email_id"
//                                     value={email_id}
//                                     onChange={e => onInputChange(e)}
//                                 />
//                             </div>
//                             <div className="form-group col-md-6">
//                                 <label htmlFor="name">Department</label>
//                                 <input type="text" 
//                                     className="form-control" 
//                                     placeholder="Department"
//                                     required
//                                     name="Department"
//                                     value={Department}
//                                     onChange={e => onInputChange(e)}
//                                 />
//                             </div>
//                         </div>
//                         <div className="form-row">
//                             <div className="form-group col-md-6">
//                                 <label htmlFor="name">Contact No</label>
//                                 <input type="text" 
//                                     className="form-control"  
//                                     placeholder="Contact No"
//                                     required
//                                     name="contact_no"
//                                     title="Contact No should be 10 Digit only"
//                                     pattern="[0-9]{10}"
//                                     value={contact_no}
//                                     onChange={e => onInputChange(e)}
//                                 />
//                             </div>
//                             <div className="form-group col-md-6">
//                                 <label htmlFor="name">birthday</label>
//                                 <input type="date" 
//                                     className="form-control" 
//                                     placeholder="birthday"
//                                     required
//                                     name="birthday"
//                                     value={birthday}
//                                     onChange={e => onInputChange(e)}
//                                 />
//                             </div>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="name">Address</label>
//                             <textarea className="form-control" 
//                                 rows="3" 
//                                 placeholder="Address"
//                                 required
//                                 name="address"
//                                 value={address}
//                                 onChange={e=> onInputChange(e)}
//                             ></textarea>
//                         </div>
//                         <div className="form-row">
//                             <div className="form-group col-md-6">
//                                 <label htmlFor="name">Graduation Year</label>
//                                 <input type="text" 
//                                     className="form-control" 
//                                     placeholder="Graduation year"
//                                     required
//                                     title="Year should be 4 Digit only"
//                                     pattern="[0-9]{4}"
//                                     name="graduation_year"
//                                     value={graduation_year}
//                                     onChange={e => onInputChange(e)}
//                                 />
//                             </div>
//                             {/* <div className="form-group col-md-4">
//                                 <label>State</label>
//                                 <select className="form-control">
//                                     <option selected>Choose...</option>
//                                     <option>...</option>
//                                 </select>
//                             </div> */}
//                             <div className="form-group col-md-6">
//                                 <label htmlFor="file">Profile</label>
//                                 <input type="file" 
//                                     className="form-control"
//                                     accept=".png, .jpg, .jpeg"
//                                     name="profile"
//                                     onChange={e => onInputChange_Student_Profile(e)}
//                                     // onChange={e=>{
//                                     //     setStudent(e.target.files[0])
//                                     // }}
//                                 />
//                             </div>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="name">Password</label>
//                                 <input type="password"
//                                     className="form-control"
//                                     placeholder="***********"
//                                     onChange={e => onInputChange(e)}
//                                     required
//                                     name="password"
//                                     value={password}
//                                     autoComplete="current-password"
//                                 />
//                         </div>
//                         <button type="submit" style={{width:'200px'}} className="btn btn-outline-primary">Submit</button>
//                     </form>
//                 </div>
//             </div>
//     );
// }
// export default Create_Student;

// EOF Funcation


// Start class
export default class Create_Studenet extends Component {
    constructor(props) {

        super(props);
        this.onInputChange_Student_First_Name = this.onInputChange_Student_First_Name.bind(this);
        this.onInputChange_Student_Last_Name = this.onInputChange_Student_Last_Name.bind(this);
        this.onInputChange_Student_Email_Id = this.onInputChange_Student_Email_Id.bind(this);
        this.onInputChange_Student_Department = this.onInputChange_Student_Department.bind(this);
        this.onInputChange_Student_Contact_No = this.onInputChange_Student_Contact_No.bind(this);
        this.onInputChange_Student_Address = this.onInputChange_Student_Address.bind(this);
        this.onInputChange_Student_DOB = this.onInputChange_Student_DOB.bind(this);
        this.onInputChange_Student_Graduation_year = this.onInputChange_Student_Graduation_year.bind(this);
        this.onInputChange_Student_Profile = this.onInputChange_Student_Profile.bind(this);
        this.onInputChange_Student_Password = this.onInputChange_Student_Password.bind(this);
        this.onhandlesubmit = this.onhandlesubmit.bind(this);

        this.state = {
            first_name: '',
            last_name: '',
            email_id: '',
            Department: '',
            contact_no: '',
            address: '',
            birthday: '',
            graduation_year: '',
            profile: null,
            password: ''
        }
    };

    onInputChange_Student_First_Name = e => {
        this.setState({ first_name: e.target.value })
    };

    onInputChange_Student_Last_Name = e => {
        this.setState({ last_name: e.target.value })
    };

    onInputChange_Student_Email_Id = e => {
        this.setState({ email_id: e.target.value })
    };

    onInputChange_Student_Department = e => {
        this.setState({ Department: e.target.value })
    };

    onInputChange_Student_Contact_No = e => {
        this.setState({ contact_no: e.target.value })
    };

    onInputChange_Student_Address = e => {
        this.setState({ address: e.target.value })
    };

    onInputChange_Student_DOB = e => {
        this.setState({ birthday: e.target.value })
    };

    onInputChange_Student_Graduation_year = e => {
        this.setState({ graduation_year: e.target.value })
    };

    onInputChange_Student_Profile = e => {
        this.setState({ profile: e.target.files[0] })
    };

    onInputChange_Student_Password = e => {
        this.setState({ password: e.target.value })
    };


    onhandlesubmit = async e => {
        e.preventDefault();

        // const id = localStorage.getItem('Token_Key');
        // console.log("id",id);

        const bodyFormData = new FormData();
        bodyFormData.append("first_name", this.state.first_name);
        bodyFormData.append("last_name", this.state.last_name);
        bodyFormData.append("email_id", this.state.email_id);
        bodyFormData.append("Department", this.state.Department);
        bodyFormData.append("contact_no", this.state.contact_no);
        bodyFormData.append("address", this.state.address);
        bodyFormData.append("birthday", this.state.birthday);
        bodyFormData.append("graduation_year", this.state.graduation_year);
        bodyFormData.append("profile", this.state.profile);
        bodyFormData.append("password", this.state.password);
        bodyFormData.append("login_id", localStorage.getItem('Token_Key'));

        console.log(bodyFormData)
        await axios.post("http://localhost:3100/studentdata/Createstudent", bodyFormData)
            .then(result => {
                console.log("Result=>", result.json());
            }).catch(err => {
                console.log("Error=>", err);
            })

        this.props.history.push(`/liststudent/${localStorage.getItem('Token_Key')}`);
    }

    render() {
        return (
            
            <div className="container py-4">
                {/* p-md-5 */}
                <div className="w-80 mx-auto shadow-lg p-5 mb-5 bg-white" style={{ borderRadius: '60px' }}>
                    {/* <h1 className="text-center mb-4"><b>ADD STUDENT</b></h1> */}
                    
                    <div className="col-12 row">
                        <div style={{ margin: '0 545px 0 0' }}>
                            <Link className="btn btn-primary btn-lg" to="/home"><i class="fas fa-chevron-left" style={{ color: 'white'}}></i> BACK PAGE</Link>
                        </div>
                        <div>
                            {/* <h1 className="text-center mb-4"><b>My profile</b></h1> */}
                            <h1><b>ADD STUDENT</b></h1>
                        </div>
                    </div>
                    <hr/>
                    <form onSubmit={e => this.onhandlesubmit(e)}>
                        <div className="form-row" style={{textAlign:'start'}}>
                            <div className="form-group col-md-6">
                                <label htmlFor="name">First Name</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="First Name"
                                    required
                                    onChange={e => this.onInputChange_Student_First_Name(e)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="name">Last Name</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Last Name"
                                    required
                                    onChange={e => this.onInputChange_Student_Last_Name(e)}
                                />
                            </div>
                        </div>
                        <div className="form-row" style={{textAlign:'start'}}>
                            <div className="form-group col-md-6">
                                <label htmlFor="name">Email</label>
                                <input type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    required
                                    onChange={e => this.onInputChange_Student_Email_Id(e)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="name">Department</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Department"
                                    required
                                    onChange={e => this.onInputChange_Student_Department(e)}
                                />
                            </div>
                        </div>
                        <div className="form-row" style={{textAlign:'start'}}>
                            <div className="form-group col-md-6">
                                <label htmlFor="name">Contact No</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Contact No"
                                    required
                                    title="Number should be 10 Digit only"
                                    pattern="[0-9]{10}"
                                    onChange={e => this.onInputChange_Student_Contact_No(e)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="name">birthday</label>
                                <input type="date"
                                    className="form-control"
                                    placeholder="Department"
                                    required
                                    onChange={e => this.onInputChange_Student_DOB(e)}
                                />
                            </div>
                        </div>
                        <div className="form-group" style={{textAlign:'start'}}>
                            <label htmlFor="name">Address</label>
                            <textarea className="form-control"
                                rows="3"
                                placeholder="Address"
                                required
                                onChange={e => this.onInputChange_Student_Address(e)}
                            ></textarea>
                        </div>
                        <div className="form-row" style={{textAlign:'start'}}>
                            <div className="form-group col-md-6">
                                <label htmlFor="name">Graduation Year</label>
                                <input type="number"
                                    className="form-control"
                                    placeholder="Graduation year"
                                    required
                                    title="Year should be 4 Digit only"
                                    pattern="[0-9]{4}"
                                    onChange={e => this.onInputChange_Student_Graduation_year(e)}
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
                                    onChange={e => this.onInputChange_Student_Profile(e)}
                                />
                            </div>
                        </div>
                        <div className="form-group" style={{textAlign:'start'}}>
                            <label htmlFor="name">Password</label>
                            <input type="password"
                                className="form-control"
                                placeholder="***********"
                                onChange={e => this.onInputChange_Student_Password(e)}
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        <button type="submit" style={{ width: '200px' }} className="btn btn-primary btn-lg"><i class="fad fa-database" style={{ color: 'white'}}></i>  SUBMIT</button>
                    </form>
                </div>
            </div>
        )
    }
}

// EOF Class