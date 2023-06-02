const mongoose = require("mongoose");
const commandSchema = require('../schemas/commandSchema');
const Command = mongoose.model('Command', commandSchema)
const express = require("express");
const router = express.Router();

router.get('/getAllCommands', (req,res)=>{
    Command.find({}).sort({"_id" : -1}).then((commands)=>{
        res.json(commands)
    })
});

router.put('/serveCommand/:id', (req,res)=>{
    const commandId = req.params.id;
    Command.findById(commandId, (err, command)=>{
        if(err){
            res.status(500).json(err)
        }else{
            Command.findByIdAndUpdate(commandId, {validate : true}, (err, command)=>{
                if(err){
                    res.status(500).json(err);
                }else{
                    res.status(200).json({success : true})
                }
            })
        }
    })
});


module.exports = router;