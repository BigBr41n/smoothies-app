//import the user model 
const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
require('dotenv').config(); 



// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
          // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }

     // incorrect password
    if (err.message === 'incorrect password') {
     errors.password = 'That password is incorrect';
    }


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



const maxAge = 3 * 24 * 60 * 60 ; // 3days

const createToken = (id)=>{
    return jwt.sign({ id } , process.env.JWT_SECRET , {
        expiresIn : maxAge , 
    }); 
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
        const token = createToken(user._id); 


        res.cookie('jwt' , token , {httpOnly : true , maxAge : maxAge*1000}); 
        res.status(201).json({user : user._id}); 


    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors }); 
    }
};






module.exports.loginGet = (req,res) =>{
    res.render('login'); 
}; 


module.exports.loginPost = async (req,res) =>{

    try {
        const { email, password } = req.body;
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}; 

