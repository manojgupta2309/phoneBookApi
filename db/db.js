const mongoose = require('mongoose');
const  env= require('../config/env')

const connectionString = require('../config/config')[env].connection_string;
const connector = mongoose.connect(connectionString)

module.exports = {
    init:()=>{
        
        connector.then(
            () => {
              console.log("Database connection established!");
             
            }            
          ).catch( err => {
            console.log("Error connecting Database  due to: ", err);
          });
        
         
    }
}
