// import React, { Component } from 'react'
//import {Redirect} from 'react-router-dom'


import React, { Component } from 'react'
import axios from 'axios'

export default class Home extends Component {

    constructor(props)
    {
        super(props)
        this.token_key_data = localStorage.getItem('Token_Key')
    }
    
    componentDidMount(){
        axios.post("http://localhost:3100/studentdata/token_data_store/" + this.token_key_data)
            .then(res => {
                console.log("Token result",res);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <div style={{fontSize:'24px',margin:'190px 0 0 0'}}><i class="fab fa-react fa-10x fa-spin"></i></div>
                <h1 style={{margin:'20px 0 20px 0',fontSize:'50px'}}>Welcome To Student</h1>
            </div>
        )
    }
}


// export default class Home extends Component {

//     constructor(props)
//     {
//         super(props)
//         const token = localStorage.getItem('token')
//         let login_check = true

//         if(token==null){
//             login_check = false
//         }

//         this.state={login_check}
//     }

//     render() {
//         if(this.state.login_check===false)
//         {
//             return <Redirect  to="/Login"/>
//         }
//         return (
//             <div>
//                 <h1 style={{margin:'250px 0 20px 0'}}>Welcome To Student</h1>
//             </div>
//         )
//     }
// }
