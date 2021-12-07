
const express = require("express");
const Contest = require("../models/contestModel");

const router = express.Router();

router.post("/",async(req,res)=>{
    try{
        const contest = await Contest.create(req.body)
        res.status(201).send("Created")
    }
    catch(err){
        res.status(409).send(err.message)
    }
})

router.get("/:p/:l",async(req,res)=>{
    try{
        const skip = Number(req.params.l)*Number(req.params.p)
        const contest = await Contest.find({}).skip(skip).limit(Number(req.params.l)).lean().exec();
        res.status(200).send(contest)
    }
    catch(err){
        res.status(404).send(err.message)
    }
})

router.get("/:p/:l/dsa",async(req,res)=>{
    try{
        const skip = Number(req.params.l)*Number(req.params.p);
        
        const contest = await Contest.find({category : {$eq : "DSA"}}).skip(skip).limit(Number(req.params.l)).lean().exec();
        
        res.status(200).send(contest)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

router.get("/:p/:l/coding",async(req,res)=>{
    try{
        const skip = Number(req.params.l)*Number(req.params.p);
        const contest = await Contest.find({category : {$eq : "Coding"}}).skip(skip).limit(Number(req.params.l)).lean().exec();
        res.status(200).send(contest)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = router