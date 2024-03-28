module.exports.signUpGet = (req,res) =>{
    res.render('singup'); 
}; 


module.exports.signUpPost = (req,res) =>{
    res.send("new user created") 
}; 


module.exports.loginGet = (req,res) =>{
    res.render('login'); 
}; 


module.exports.loginPost = (req,res) =>{
    res.send("user login");  
}; 

