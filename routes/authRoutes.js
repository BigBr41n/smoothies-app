//creating a new instance of the router
const router = require('express').Router(); 

//importing auth controller 
const authController = require('../controllers/authController'); 




router.get('/signup' , authController.signUpGet );
router.post('/signup' , authController.signUpPost);
router.get('/login' , authController.loginGet);
router.post('/login' , authController.loginPost);




module.exports = {router}; 