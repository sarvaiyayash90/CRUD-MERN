import React, { useState, useEffect } from 'react'
import axios from 'axios';
import moment from 'moment';
import { saveAs } from 'file-saver';

import { Link, NavLink } from 'react-router-dom';

const List_Student = () => {

    const [student_data, setStudent] = useState([]);

    useEffect(() => {
        load_student_data();
    }, []);

    const load_student_data = async () => {
        const result = await axios.get(`http://localhost:3100/studentdata/liststudent/${localStorage.getItem('Token_Key')}`)
        setStudent(result.data);
    }

    const delete_student = async id => {
        await axios.delete(`http://localhost:3100/studentdata/deletestudent/${id}`);
        load_student_data();
    };

    const csv = async id => {
        await axios.get(`http://localhost:3100/studentdata/csv/${id}`);
        load_student_data();
    };

    const fetch_CSV = (id) =>{
        console.log("call fetch")
        axios.get("http://localhost:3100/studentdata/fetchcsv/"+id,{ responseType: 'blob' })
        .then((res) => {
           console.log("res",res);
           const pdfBlob = new Blob([res.data], { type: 'application/csv' });
           //console.log("pdfdata",pdfBlob);
           saveAs(pdfBlob, 'DATA_INFO' + '_' + Date.now() + '.csv');
        })
        .catch(err=>{
           console.log("Error=>",err)
        })
    }

    const pdf = async id => {
        await axios.post(`http://localhost:3100/studentdata/pdf/${id}`);
        load_student_data();
    };

    const fetch_pdf = (id,fname,lname) =>{
        console.log("call fetch")
        console.log(id,fname,lname);
        axios.get("http://localhost:3100/studentdata/fetchpdf/"+id,{ responseType: 'blob' })
        .then((res) => {
           const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
           console.log("pdfdata",pdfBlob);
           saveAs(pdfBlob, fname + "_" + lname + "_" + Date.now() +'.pdf');
        })
        .catch(err=>{
           console.log("Error=>",err)
        })
    }


    return (
        <div className="container" style={{ marginLeft: '0px' }}>
            <div className="py-4 shadow-lg p-0 mb-5 bg-white" style={{ width: '1480px', margin: '20px 0 0 0', borderRadius: '60px' }}>

                <div className="col-12 row">
                    <div style={{ margin: '0 0 0 50px' }}>
                        <h1 style={{ fontSize: '40px', fontFamily: 'cursive' }}>Students List Page</h1>
                    </div>
                    <div style={{ margin: '0 0 10px 985px' }}>
                        <Link style={{border:'none'}} className="btn btn-outline-warning btn-lg" onClick={() => { if (window.confirm('Are you sure you wish to create CSV ?')) csv(localStorage.getItem('Token_Key')); fetch_CSV(localStorage.getItem('Token_Key')) }} ><i class="far fa-file-csv fa-2x"></i></Link>
                    </div>
                </div>

                <table className="table border">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"><i class="fal fa-list-ol fa-2x" style={{color:"white"}}></i></th>
                            <th scope="col" >Image</th>
                            <th scope="col" >Firstname</th>
                            <th scope="col" >Lastname</th>
                            <th scope="col" >Email</th>
                            <th scope="col" >Department</th>
                            <th scope="col" >Mobile NO</th>
                            <th scope="col" >Address</th>
                            <th scope="col" width="150px" >DOB</th>
                            <th scope="col" >Graduation Year</th>
                            <th scope="col" >password</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {student_data.map((stu, index) => (
                            <tr>
                                <th id="tab" scope="row">{index + 1}</th>
                                <td id="tab"><img style={{width:'60px',height:'60px',borderRadius:'60px'}} src={'/uploads/' + stu.profile} /></td>
                                <td id="tab">{stu.first_name}</td>
                                <td id="tab">{stu.last_name}</td>
                                <td id="tab">{stu.email_id}</td>
                                <td id="tab">{stu.Department}</td>
                                <td id="tab">{stu.contact_no}</td>
                                <td id="tab">{stu.address}</td>
                                <td id="tab">{moment(stu.birthday).format('DD-MM-YYYY')}</td>
                                <td id="tab">{stu.graduation_year}</td>
                                <td id="tab">{stu.password}</td>
                                <td style={{verticalAlign: 'middle',textAlign: 'center',display: 'revert' }}>
                                    <Link  style={{border:'none'}}  className="btn btn-outline-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) delete_student(stu._id) }} ><i class="fas fa-trash-alt"></i></Link>
                                    <Link  style={{border:'none'}}  className="btn btn-outline-success" exact to={`/viewstudent/${stu._id}`}><i class="fa fa-eye fa-spin"></i></Link>
                                    <Link  style={{border:'none'}}  className="btn btn-outline-primary" exact to={`/Editstudent/${stu._id}`} ><i class="far fa-edit"></i></Link>
                                    <Link  style={{border:'none'}}  className="btn btn-outline-info" onClick={() => { if (window.confirm('Are you sure you wish to create PDF ?')) pdf(stu._id); fetch_pdf(stu._id,stu.first_name,stu.last_name) }} ><i class="far fa-file-pdf"></i></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List_Student;


// import React, { Component } from 'react'
// import axios from 'axios';

// import { Link, NavLink } from 'react-router-dom';

// export default class List_Studenet extends Component {

//     constructor(props) {
//         super(props)
//         this.delete_student = this.delete_student.bind(this)
//         this.state = { students: [] }
//     }

//     componentDidMount() {
//         axios.get("http://localhost:3100/studentdata/liststudent")
//             .then(res => {
//                 this.setState({
//                     students: res.data.reverse()
//                 });
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }

//     delete_student = id =>{
//         axios.delete(`http://localhost:3100/studentdata/deletestudent/${id}`)
//         .then(res=>{
//             //console.log('Student successfully deleted!'+res.id);
//             window.location.replace('/liststudent');
//             //this.props.history.push("/liststudent");
//         }).catch(err=>{
//             console.log('Student Not deleted!'+err);
//         })
//     }

//     render() {
//         return (
//             <div className="container" style={{marginLeft:'0px'}}>
//                 <div className="py-4">
//                     <h1 style={{margin:'0 0 10px 360px',fontSize:'40px',fontFamily: 'cursive'}}>Students Page</h1>
//                     <table className="table border shadow-lg p-5 mb-5 bg-white rounded" style={{width:'1480px'}}>
//                         <thead className="thead-dark">
//                             <tr>
//                                 <th scope="col">#</th>
//                                 <th scope="col" width="10px">Image</th>
//                                 <th scope="col" width="10px">Firstname</th>
//                                 <th scope="col" width="10px">Lastname</th>
//                                 <th scope="col" width="20px">Email</th>
//                                 <th scope="col" width="10px">Department</th>
//                                 <th scope="col" width="10px">Mobile NO</th>
//                                 <th scope="col" width="30px">Address</th>
//                                 <th scope="col" width="10px">DOB</th>
//                                 <th scope="col" width="10px">Graduation Year</th>
//                                 <th scope="col" width="10px">password</th>
//                                 <th scope="col">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {this.state.students.map((stu, index) => (
//                                 <tr>
//                                     <th scope="row">{index + 1}</th>
//                                     <td><img width="50" height="50" src={'/uploads/' + stu.profile} /></td>
//                                     <td>{stu.first_name}</td>
//                                     <td>{stu.last_name}</td>
//                                     <td>{stu.email_id}</td>
//                                     <td>{stu.Department}</td>
//                                     <td>{stu.contact_no}</td>
//                                     <td>{stu.address}</td>
//                                     <td>{(stu.birthday)}</td>
//                                     <td>{stu.graduation_year}</td>
//                                     <td>{stu.password}</td>
//                                     <td>
//                                         <Link className="btn btn-outline-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?'))  this.delete_student(stu._id) }} >DELETE</Link>
//                                         {" "}||{" "}
//                                         <Link className="btn btn-outline-secondary" exact to={`/viewstudent/${stu._id}`}>VIEW</Link>
//                                         {" "}||{" "}
//                                         <Link className="btn btn-outline-primary" exact to={`/Editstudent/${stu._id}`} >EDIT</Link>

//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         )
//     }
// }
