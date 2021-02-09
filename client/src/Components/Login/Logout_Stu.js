import React, { Component, useState, useEffect } from 'react'

export default class Logout_Stu extends Component {

    componentDidMount(){
        const data = localStorage.removeItem('Token_Key')
        if(!data)
        {
            alert("Logout Successfully")
            window.location.href="/"
        }
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}


//  ============================== logout windows locations 
// const Logout_Stu = () => {

//     useEffect(() => {
//         localStorage.removeItem('Token_Key')
//         .then((result) => {
//             console.log("result",result);
//             alert("Logout Successfully")
//             window.location.href="/"
//         }).catch((Error)=>{
//             console.log("Error",Error);
//         })
//     },[]) 
    
//     return window.location.href="/"
// }
 
// export default Logout_Stu ;


// ====================================== logout auth 
// import React, { Component,useEffect } from 'react'
// import {Redirect} from 'react-router-dom'

// import {Link} from 'react-router-dom'
// import Authapi from '../utils/AuthApi';


// const Logout_Stu = () => {

//     const authApi = React.useContext(Authapi);

//     useEffect(() => {
//         localStorage.removeItem('Token_Key')
//         authApi.setAuth(false)
//     },[])

//     return <Redirect to="/Login"/>
// }
 
// export default Logout_Stu ;



