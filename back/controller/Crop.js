const {Crop}=require("../models/index")
module.exports={
    async create(req,res){
        try{
            const crop=await Crop.create(req.body);
            res.status(201).send(crop);
        }catch(err){
            res.status(400).send({error:err});
        }
    }
}