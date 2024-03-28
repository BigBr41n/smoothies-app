//import the user model 
const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 

module.exports.signUpGet = (req,res) =>{
    res.render('singup'); 
}; 


module.exports.signUpPost = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body); // Check if email and password are correctly received

    try {
        const saltRounds = 10; // Number of salt rounds
        const hashedPass = await bcrypt.hash(password, saltRounds);
        
        const user = new User({
            email: email, 
            password: hashedPass, 
        }); 
        await user.save(); 

        res.status(201).json(user); 
    } catch (error) {
        console.log(error); 
        res.status(400).send("internal error"); 
    }
};






module.exports.loginGet = (req,res) =>{
    res.render('login'); 
}; 


module.exports.loginPost = (req,res) =>{
    res.send("user login");  
}; 

