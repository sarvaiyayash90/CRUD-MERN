const mongoose = require('mongoose')

const Student_schema = new mongoose.Schema({
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    email_id:{
        type:String
    },
    Department:{
        type:String
    },
    contact_no:{
        type:Number
    },
    address:{
        type:String
    },
    birthday:{ 
        type: Date 
    },
    graduation_year:{
        type:Number
    },
    profile:{
        type:String
    },
    password:{
        type:String
    },
    login_id:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'login'}
    ]
},{
    timestamps:true
})

module.exports = mongoose.model('Student',Student_schema)