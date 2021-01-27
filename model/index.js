const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/market'
mongoose.connect(url ,  {useNewUrlParser: true, useUnifiedTopology: true} , function(err , db){

if(!err){
    console.log("success connect");
}
else {
    console.log("connection Error");
}

});

const users = require('./users');
const prodect = require('./prodect');
const basket = require('./shopping_basket');