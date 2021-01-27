const mongoose = require('mongoose');
 // the users
const userSchema = new mongoose.Schema({

    name : { type : String } ,
    user :{type : String , required : 'Required' , uniqueItems: true } ,
    email : {type : String , required : 'Required'  , uniqueItems: true } ,
    password : {type : String , required : 'Required'} 
});


 // insert model
mongoose.model('User' , userSchema);