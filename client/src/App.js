import './App.css';

import React, { useState, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'; // bootstrap
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'; // route

//layout
import NavBar from './Components/Layout/NavBar';

// page 
import Home from './Components/Pages/Home';
import NotFound from './Components/Pages/NotFound';

// student
import Createstudent from './Components/Student/Create_Student';
import liststudent from './Components/Student/List_Student';
import viewstudent from './Components/Student/View_Student';
import Editstudent from './Components/Student/Edit_Student';

//Login
import Login from './Components/Login/Login_Stu';
import Logout from './Components/Login/Logout_Stu';
import Profile from './Components/Login/Profile';


function App() {

  const auth = localStorage.getItem('Token_Key')
  if (auth == null) {
    return <Router><Route exact path="/" component={Login} /><Redirect to="/" /></Router>
  }
  else {
    return (
      <div className="App">
        <div className="content">
          <Router>
            <NavBar />
            <Switch>
              <Route exact path="/home" component={Home} />

              {/* Start student  */}
              <Route exact path="/Createstudent" component={Createstudent} />
              <Route exact path="/liststudent/:id" component={liststudent} />
              <Route exact path="/viewstudent/:id" component={viewstudent} />
              <Route exact path="/Editstudent/:id" component={Editstudent} />
              {/* EOF student */}

              {/* start Login */}
              {/* <Route exact path="/Login" component={Login} /> */}
              <Route exact path="/Logout" component={Logout} />
              <Route exact path="/Profile" component={Profile} />
              {/* EOF Login */}

              {/* start Not found */}
              <Route component={NotFound} />
              {/* EOF Not found */}

            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;

//AuthApi
// import AuthApi from './Components/utils/AuthApi';

// function App() {

//   const [auth, setAuth] = useState(false) // check auth and setauth login by default value is false

//   // stay login
//   useEffect( async ()=>{
//     const auth = localStorage.getItem('Token_Key')  
//     if(auth)
//     {
//       setAuth(true)
//     }
//   },[])
//   // EOF stay Login

//   return (
//     <div className="App">
//       <div className="content">
//         <AuthApi.Provider value={{auth,setAuth}}>
//           <Router>
//             <NavBar/>
//               <Switch>

//                 <RouteProtected exact path="/home" component={Home} /> 
//                 {/* Start student  */}
//                 <RouteProtected exact path="/Createstudent" component={Createstudent} />
//                 <RouteProtected exact path="/liststudent" component={liststudent} />
//                 <RouteProtected exact path="/viewstudent/:id" component={viewstudent} />
//                 <RouteProtected exact path="/Editstudent/:id" component={Editstudent} />
//                 {/* EOF student */}


//                 {/* start Login */}
//                 <RouteRegisteration exact path="/Login" component={Login}/> 
//                 <Route exact path="/Logout" component={Logout}/>
//                 <RouteProtected exact path="/Profile" component={Profile}/>

//                 {/* EOF Login */}
//                 <RouteProtected component={NotFound} />
//               </Switch>
//           </Router>
//         </AuthApi.Provider>
//       </div>
//     </div>
//   );
// }

// const RouteRegisteration = ({component:Component,...rest})=>{
//   const authApi = React.useContext(AuthApi);
//   return <Route {...rest} render={props=> !authApi.auth ? <Component {...props}/> : <Redirect to="/home"/>  }/>;
// }

// const RouteProtected = ({component:Component,...rest})=>{
//   const authApi = React.useContext(AuthApi);
//   return <Route {...rest} render={props=> authApi.auth ? <Component {...props}/> : <Redirect to="/login"/> }/>;
// }


// export default App;

