//import the user model 
const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 



// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }











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
        const errors = handleErrors(error);
        res.status(400).json({ errors }); 
    }
};






module.exports.loginGet = (req,res) =>{
    res.render('login'); 
}; 


module.exports.loginPost = (req,res) =>{
    res.send("user login");  
}; 

