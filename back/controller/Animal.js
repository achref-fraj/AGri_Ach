const {Animal}=require('../models/index');


module.exports={
    async create(req,res){
        try{
            const animal=await Animal.create(req.body);
            res.status(201).send(animal);
        }catch(err){
            res.status(400).send({error:err});
        }
    }
}