  const express = require("express"),
  session = require("express-session"),
  router = express.Router(),
  mongoose = require("mongoose"),
  dataBase = require("../model"),
  userModel = mongoose.model("User"),
  User = new userModel(),
  prodretModel = mongoose.model("prodect"),
  basketModel = mongoose.model("basket"),
  multer = require("multer"),
  bcrypt = require("bcrypt"),
  md5 = require("md5"),
  fs = require("fs"), 
  {body,validationResult,check} = require('express-validator');



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Math.random() * 6666 + file.originalname);
  },
});

const upload = multer({storage: storage});

// GET METHOD

router.get("/", (req, res, next) => {
  prodretModel.find((err, doc) => {
    basketModel.countDocuments((err, count) => {
      res.render("index", {data: doc,basket: count,user: req.cookies.user});

    });

  });

});
router.get("/register", (req, res, next) =>  res.render("register"));

router.get("/login", (req, res, next) =>  res.render("login"));

router.get("/add_prodect", (req, res, next) =>  res.render("add_prodect") );

router.get("/prodect/:id", (req, res, next) => prodretModel.findById(req.params.id, (err, doc) =>  res.render("prodect", { data: doc })));

router.get("/delete/:id", (req, res, next) => {
  prodretModel.findByIdAndDelete(req.params.id, (err, doc) => {

    if (!err) {

      for (i = 0; i < doc.imgProdect.length; i++) {
        
        let file = doc.imgProdect[i].path;
        fs.unlinkSync(file); 
      }

      res.status(200).redirect("/");
    }
  });
});


router.get("/logout", (req, res, next) => {
  res.clearCookie("login_token");
  res.clearCookie('user');
  res.redirect("/login");
});

router.get("/basket", (req, res, next) => {
  userModel.findOne({user : req.cookies.user}, (err1 , id) =>{

    (!err1) ?  basketModel.find({userId : id._id} ,(err2, doc) =>  res.render("basket", {data: doc })) : false});
  });
  

router.get('/card', (req, res) => res.render('card' , {month : null , years : null }));

// POST METHOD
router.post("/register", (req, res, next) => {

  let {name,user,email, password} = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.render('register', {errors: errors.mapped(),if: errors.isEmpty() == false});
  
  
  } 
  else {

    User.user = name;
    User.name = user;
    User.email = email;
    User.password = md5(password);
    User.save();
    res.redirect("/login");

  }
});

router.post("/login", [check('email', 'is not email').isEmail()], (req, res, next) => {
  let User = userModel,
  {email, password} = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('login', {
      errors: errors.mapped()
    });
  }

  User.findOne({
    email: email,password: md5(password)}, (err, user) => {
    if (err) {
      return res.status(500).send();
    }

    if (!user) {
      return res.redirect("/login");
    }

    res.cookie("login_token", +new Date(), {
      maxAge: 3600000,
      path: "/"
    });

    res.cookie("user", user.user, {
      maxAge: 3600000,
      path: "/"
    });

    res.redirect("/");
  });
});

router.post("/add_prodect", upload.array("imgProdect", 4), (req, res, next) => {

  let {nameProdect, titleProdect, priceProdect} = req.body , 
  prodret = new prodretModel();



  prodret.nameProdect = nameProdect;
  prodret.titleProdect = titleProdect;
  prodret.priceProdect = priceProdect + "$";
  prodret.imgProdect = req.files;
  prodret.imgInterface = req.files[0].filename;
  prodret.save();
  res.status(200).redirect("/");
});

router.post("/prodect/:id", (req, res, next) => {
  userModel.findOne({user: req.cookies.user},   (err3, user) => {
    let user_id = user;
      
  prodretModel.findById(req.params.id, (err, doc) => {

    let basket = new basketModel() ,
    User = userModel();
    
      basketModel.findOne({ProdectId: doc._id , userId :user_id._id }, (err2, result) => {
        if (result) {
        
          if (!err2) {
            
            basketModel.findByIdAndUpdate(result._id, { quantity: result.quantity + req.body.quantity * 1}, (error, update) => res.redirect("/basket"));
          }
        }
          else {
          
          if (!err) {
            basket.nameProdect = doc.nameProdect;
            basket.price = doc.priceProdect;
            basket.imgInterface = doc.imgInterface;
            basket.inbasket = true;
            basket.ProdectId = doc._id;
            basket.quantity = req.body.quantity;
            basket.userId = user_id._id ;
            basket.save();
            
            res.status(200).redirect("/basket");
          }
          
        }
      });
      
    });
  });
});
router.post('/card', (req, res) => {

});

module.exports = router;