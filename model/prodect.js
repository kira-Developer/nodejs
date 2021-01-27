const mongoose = require('mongoose');

const prodectSchema = new mongoose.Schema({

    nameProdect : {type : String , required : 'Required'},
    titleProdect :{type : String , required : 'Required'} ,
    priceProdect : {type : String , required : 'Required'}, 
    imgProdect : {type : Array , required : 'Required'}, 
    imgInterface : {type : String , required : 'Required'}, 

});
mongoose.model('prodect' , prodectSchema);