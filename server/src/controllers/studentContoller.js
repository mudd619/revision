
const express = require("express");
const Student = require("../models/studenModel");

const router = express.Router();



router.post("/",async(req,res)=>{
    try{
        const student = await Student.create(req.body);
        res.status(201).send("Created")
    }
    catch(err){
        res.status(409).send(err.message)
    }
})

router.get("/",async(req,res)=>{
    try{
        
        const student = await Student.find({}).lean().exec();
        res.status(200).send(student)
    }
    catch(err){
        res.status(404).send(err.message)
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const student = await Student.findByIdAndDelete(req.params.id);
        res.status(200).send("Updated")
    }
    catch(err){
        res.status(404).send(err.message)
    }
})

router.get("/name",async(req,res)=>{
    try{
        const student = await Student.find({}).sort({name: 1}).lean().exec()

        res.status(200).send(student)
    }
    catch(err){
        res.status(404).send(err.message)
    }
})

router.get("/age",async(req,res)=>{
    try{
        const student = await Student.find({}).sort({age:1}).lean().exec()

        res.status(200).send(student)
    }
    catch(err){
        res.status(404).send(err.message)
    }
})

module.exports = router