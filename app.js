const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
// this line is a being per default in the new version :  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true } 
mongoose.connect(process.env.DB_URI); 
const db = mongoose.connection ; 
db.on("error" , ()=>{console.log(`connection broke `)}); 
db.once("open" , ()=> console.log("db connected")); 



// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));


//handlling any other routes that does not exist 
app.use((req , res , next)=>{
  try {
    const error = new Error("Invalid Route"); 
    error.status = 404 ; 
    next(error); 
  } catch (error) {
    console.log(error); 
  }
}); 

app.use((error , req , res , next)=>{
  try {
    res.status(404).send(`<center><h1>${error.message}</h1></center>`)
  } catch (error) {
    console.log(error); 
  }
})



module.exports = app ; 