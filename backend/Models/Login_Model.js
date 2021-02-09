const mongoose = require('mongoose')

const Login_schema = new mongoose.Schema({
    username:
    {
        type:String,
    },
    email_id:{
        type:String
    },
    password:{
        type:String
    },
    profile_img:{
        type:String
    }
})
// ,{
//     timestamps:trues
// })

module.exports = mongoose.model('login',Login_schema,'login')