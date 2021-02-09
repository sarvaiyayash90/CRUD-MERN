const mongoose = require('mongoose');


// connection start

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/stuDB',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        //useFindAndModify: false
    }
)
mongoose.connection.on('connected', () => {
    console.log("********** < Database ( Mongoose As MongoDB ) Connected Succsessfuly > **********")
})
mongoose.connection.on('error', () => {
    console.log("Database (Mongoose as MongoDB) Not Connected")
})

// connection EOF