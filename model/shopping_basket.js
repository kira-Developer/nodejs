const mongoose = require('mongoose');

const shopping_Basket_Schema = new mongoose.Schema({

    nameProdect : {type : String , required : 'Required'},
    price : {type : String , required : 'Required'}, 
    imgInterface : {type : String , required : 'Required'}, 
    buy_success : {type : Boolean},
    inbasket : {type : Boolean , required : 'Required' },
    ProdectId : {type : String , required : 'Required'},
    quantity : {type : Number , required : 'Required'},
    userId : {type : String , required : 'Required'},


});
mongoose.model('basket' , shopping_Basket_Schema);