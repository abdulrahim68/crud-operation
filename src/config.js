const dotenv=require('dotenv');
const mongoose = require("mongoose");
dotenv.config({path:'./.env'});
const DB=process.env.DATABASE;
const db=mongoose.connect(DB,{useNewUrlParser:true,useFindAndModify:true,useUnifiedTopology:true,useFindAndModify:false},function(err, response){
   if(err){ console.log('Failed to connect'); }
   else{ console.log('Connected to database'); }
});
module.exports =db;