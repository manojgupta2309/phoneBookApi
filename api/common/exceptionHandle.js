module.exports =(err,res)=>{
    console.log("err",err)
    if(err.kind =="ObjectId" && err.name == "CastError")
        res.status(400).json({"message":"invalid objectId"})
    else    
    res.status(500).json({"message":"server error",err:err})
}