const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('../../config/env')
const config = require('../../config/config')[env];
const User = require('../../models/User')
const exceptionHandle = require('../common/exceptionHandle')

router.post('/register', async (req, res)=> {

   let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    let newUser={
      "name" : req.body.name,
      "phone" : req.body.phone,
      "email" : req.body.email,
      "password" : hashedPassword
    }
    newUser= new User(newUser);
    
    try{
      await newUser.save();
      res.status(201).json({"message": "User created successfully"});
    }catch(err){
      exceptionHandle(err,res)
    }


});


router.post('/login', async (req, res) =>{
  var {email,password} = req.body
  if(email && password)
       try{
        var user = await User.findOne({email:email})
        if(!user){
          res.status(404).json({auth: false,"message":"Invalid credentials"});
          return;
          }
          if(user.email==email && bcrypt.compareSync(password, user.password))
            {
              let token = jwt.sign({email:user.email,name:user.name}, config.secret, {
                expiresIn: 86400 
              });
              res.status(200).send({ auth: true, token: token ,email:user.email});
          
            }
            else{
              res.status(401).send({ auth: false,message:"Incorrect password"});
            }
      }catch(err){
        exceptionHandle(err,res)
      }
     
  else {
    res.status(400).json({"message":"validation failed"})
  }
 

});
 
module.exports = router;