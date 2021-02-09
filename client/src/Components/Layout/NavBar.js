
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {

    const auth = localStorage.getItem('Token_Key')
    return (
        <nav className="navbar">
            {/* <h1>MAHADEV</h1> */}
            <NavLink className="nav-link" exact to="/home"><h1>MAHADEV</h1></NavLink>
            <div className="links">
                {/* <NavLink className="nav-link" exact to="/Logout">Logout</NavLink> */}
                { auth ? <NavLink className="nav-link" exact to="/Logout">Logout <i class="fad fa-sign-out"></i></NavLink> : <a></a> }
                {/* <NavLink className="nav-link" exact to="/Login">Login</NavLink> */}
                { auth ?  <NavLink className="nav-link" exact to="/Profile">My Profile</NavLink> : <a></a> }
                <NavLink className="nav-link" exact to="/Createstudent">Create Student</NavLink>
                <NavLink className="nav-link" exact to={`/liststudent/${auth}`}>Student List</NavLink>
            </div>
        </nav>
    );
}

export default NavBar;


//import React, { Component } from 'react'  

// export default class NavBar extends Component {

//     constructor(props) {
//         super(props)

//         const token = localStorage.getItem('token')
//         let login_check = true
        
//         if(token==null){
//             login_check = false
//         }


//         this.state={login_check}

//     }

//     render() {
//         if(this.state.login_check == true)
//         {
                        
//         return (
//             <nav className="navbar">
//             {/* <h1>MAHADEV</h1> */}
//             <NavLink className="nav-link" exact to="/home"><h1>MAHADEV</h1></NavLink>
//             <div className="links">
            
//             {/* {if(token)} */}
//                 <NavLink className="nav-link" exact to="/Logout">Logout</NavLink>
//                 {/* <NavLink className="nav-link" exact to="/Login">Login</NavLink> */}
//                 <NavLink className="nav-link" exact to="/Createstudent">Create Student</NavLink>
//                 <NavLink className="nav-link" exact to="/liststudent">Student List</NavLink>
//             </div>
//         </nav>
//         )}
//         else{
//             return <h1>Welcome Student</h1>
//         }
//     }
// }
