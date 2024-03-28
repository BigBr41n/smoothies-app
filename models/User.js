const moongose = require('mongoose'); 


const userSchema = moongose.Schema({
    email:{
        type : String , 
        required : true , 
        unique : true , 
        lowercase : true , 
    }, 
    password :{
        type : String , 
        required : true , 
        minLength : 6 , 
    },
}); 



module.exports = moongose.model("User" , userSchema); 