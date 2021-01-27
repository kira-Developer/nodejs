// mongoDB
const mongoose = require('mongoose');

//express
const express = require('express');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');


// Handlebars
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

// Path
const path = require('path');

//  pasrer
const bodyparser = require("body-parser");
const cookie = require('cookie-parser');

// file include
const controller = require('./controller/routes');
const passport = require('passport');
// normal const

const app = express();
const port = 3000 ;

 const login = require('./middleware/index');




app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookie());
app.use(controller);
app.use(express.static (path.join(__dirname , 'uploads')));
app.use(express.static (path.join(__dirname , 'public')));
app.use(login);

app.engine('hbs'  , expressHandlebars(
    {
        extname : 'hbs' , 
        defaultLayout : 'layout',
        layoutsDir : __dirname + '/views/layouts',
        handlebars: allowInsecurePrototypeAccess(Handlebars)
        
    }
));

// view engine setup
app.set('views' , path.join( __dirname , "/views/"));
app.set('view engine' , 'hbs');






 



// app listen
app.listen(port , ()=> {
    console.log("listen in port " + port);
})