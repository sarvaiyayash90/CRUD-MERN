require('./db')

//const mongoose = require('mongoose')
var express = require("express")
var bodyParser = require('body-parser')
var cors = require('cors')
// var session = require('express-session')
// const {localStorage} = require("node-localstorage");

var student_controller = require('./Controllers/Student_Controller')
var login_controller = require('./Controllers/Login_Controller') 

var app = express();
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   }))

// app.use(session({
// 	secret: 'secretyash123',
// 	resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false,httpOnly:true,maxAge:3600000 }
// }));

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");//Authorization, sid
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', "true");
  // res.setHeader('Content-Length', stat.size);
res.setHeader('Content-Type', 'application/pdf');
res.setHeader('Content-Disposition', 'attachment; filename=agreement.pdf');
  next();
});

// app.use((req,res,next)=>{
//   console.log(req.session);
//   next();
// })

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:3000'}))

app.listen(3100,()=>{console.log("\n \t\t\t < Server Started At Port : (3100) > \n ")});

app.use('/studentdata',student_controller); // Student controller
 
app.use('/logindata',login_controller); // Login Controller

