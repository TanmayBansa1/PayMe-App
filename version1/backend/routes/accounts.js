const express = require("express");
// const app = express.app();
const accountsRouter = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const zod = require("zod");
const jwt_secret = require("../config");
const { User, Accounts } = require("../db");
const { authMiddleware } = require("../middleware");


accountsRouter.get('/balance',authMiddleware, async (req,res)=>{
    const userId=  req.userId;
    // console.log(userId);
    const existingUser = await Accounts.findOne({
        userId: userId
    })
    // console.log(existingUser);

    res.status(200).json({
        balance: existingUser.balance
    })
})

accountsRouter.post('/transfer',authMiddleware, async (req,res)=>{

    const session = await mongoose.startSession();
    session.startTransaction();
    const {to,amount} = req.body;

    const sender = await Accounts.findOne({
        userId: req.userId
    }).session(session);

    if(!sender || sender.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }
    const reciever = await Accounts.findOne({
        userId: to
    }).session(session);
    if(!reciever){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        })
    }
     
    const updateS = await Accounts.updateOne({
        userId: req.userId
    },{
        $inc: {
            balance: -amount
        }
    }).session(session);

    const updateR = await Accounts.updateOne({
        userId: to
    },{
        $inc: {
            balance: amount
        }
    }).session(session);

    await session.commitTransaction();

    res.status(200).json({
        message: "Transfer successful"
    })


})


module.exports = accountsRouter;