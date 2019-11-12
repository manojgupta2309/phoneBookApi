const router = require('express').Router();
const Contact = require('../../models/Contact')
const exceptionHandle = require('../common/exceptionHandle')

router.get('/', async (req, res)=> {
 
  try{
    const contactList = await Contact.find({"userEmail":req.email})
    res.status(200).json(contactList);
  }catch(err){
    exceptionHandle(err,res)
  }
})

router.get('/:id', async (req, res)=> {
  const {id} = req.params;
  try{
    const contact= await Contact.findOne({ _id: id })
    if(!contact){
      res.status(404).json({"message":"contact not found"});
      return;
    }
    else 
    res.status(200).json(contact);
  }catch(err){
    exceptionHandle(err,res)
  }
 
})

router.get('/:page/:limit', async (req, res)=> {
 let page = parseInt(req.params.page) || 1,
  limit = parseInt(req.params.limit)
  try{
    const totalRecords = await Contact.find({"userEmail":req.email}).count().exec()
    const contactList = await Contact.find({"userEmail":req.email}).sort({createdOn:-1}).skip((page-1)*limit).limit(limit).exec()
    res.status(200).json({totalRecords:totalRecords,totalPages:totalRecords/limit,contacts:contactList});
  }catch(err){
   exceptionHandle(err,res)
  }

})

router.post('/', async (req, res)=>{
  let contactObj = req.body
  contactObj.userEmail = req.email
  let contact= new Contact(contactObj);

  try{
    contact = await contact.save(contact);
    res.status(201).send({message:"contact created successfully",contact:contact})
  }catch(err){
    exceptionHandle(err,res)
  }
  
});


router.put('/:id',async (req,res)=>{
  let updateContactObj =  req.body;
  let {id} = req.params;
  try{
    let updatedContact = await Contact.findOneAndUpdate({_id:id}, updateContactObj, {
      new: true
    });
    res.json({message:"contact updated successfully",contact:updatedContact})
  }catch(err){
    exceptionHandle(err,res)
  }
  
 
})

router.delete('/:id', async (req, res) =>{
  let {id} = req.params;
  try{
    const contact =await Contact.findOne({ _id: id })
    if(!contact){
      res.status(404).send({"message":"contact not found"})
      return;
     } 
     const deletedObj =  await Contact.deleteOne({ _id: contact._id })
     res.status(200).json({"message":"Contact deleted successfully",contact:contact});

  }catch(err){
    exceptionHandle(err,res)
  }

})


module.exports = router;