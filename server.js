const http = require('http'); 
const app = require('./app'); 
require("dotenv").config(); 


const server = http.createServer(app); 
const PORT = process.env.PORT || 4000 ; 



server.listen(PORT,'0.0.0.0' , ()=>{
    console.log(`listen on : ${PORT}`); 
})


server.keepAliveTimeout = 120000; // 2 minutes
server.headersTimeout = 120000; // 2 minutes