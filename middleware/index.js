
const login = (req , res , next) => {
if(!req.cookies.login_token){
      res.redirect("/login");
    return;
}

};

module.exports = login;