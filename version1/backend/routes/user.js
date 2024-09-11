const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { User, Accounts } = require("../db");
const jwt_secret = require("../config");
const { authMiddleware } = require("../middleware");
const userRouter = express.Router();

userRouter.get('/getinfo',authMiddleware, async (req,res)=>{
  const userId = req.userId;

  const user = await User.findOne({_id: userId});
  if (!user) {
    res.status(411).json({ 
      message: "User doesnt exist",
    });
  }
  const userAccount = await Accounts.findOne({userId});


  res.status(200).json({
    name: user.firstname,
    balance: userAccount.balance
  })

  
})
const userzod = zod.object({
  username: zod.string().email(),
  password: zod.string().min(4),
  firstname: zod.string().max(20),
  lastname: zod.string().max(20),
});
userRouter.post("/signup", async (req,res) => {
  const userObject = req.body;
  const response = userzod.safeParse(userObject);

  if (response.success) {
    const existingUser = await User.findOne({
      username: req.body.username,
    });

    if (existingUser) {
      res.status(411).json({
        message: "Email already taken / Incorrect inputs",
      });
    }
    const newUser = await User.create({
      username: userObject.username,
      password: userObject.password,
      firstname: userObject.firstname,
      lastname: userObject.lastname,
    });
    const userId = newUser._id;
    const newAccount = await Accounts.create({
        userId: userId,
        balance: 1+Math.random()*10000
    })
    const token = jwt.sign({ userId }, jwt_secret);

    res.status(200).json({
      message: "User created successfully",
      token: token,
    });
  } else {
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
});

const signInobject = zod.object({
  username: zod.string().email(),
  password: zod.string().min(4),
});

userRouter.post("/signin", async (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  const validate = signInobject.safeParse({
    username,
    password,
  });

  if (!validate.success) {
    res.status(411).json({
      massage: "Incorrect email id or password",
    });
    return;
  }

  const user = await User.findOne({
    username: username,
    password: password,
  });
  if (!user) {
    res.status(411).json({
      message: "User doesnt exist",
    });
  }
  const userId = user._id; 

  const token = jwt.sign({ userId }, jwt_secret);

  res.status(200).json({
    token
    
  });
});
const updateSchema = zod.object({
  password: zod.string().min(4),
  firstname: zod.string().max(20),
  lastname: zod.string().max(20),
});
userRouter.put("/", authMiddleware, async (req,res) => {
  const validate = updateSchema.safeParse(req.body);

  if (!validate.success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.status(200).json({
    message: "Updated successfully",
  });
});

userRouter.get("/bulk", authMiddleware, async (req,res) => {
  const parameter = req.query.filter || "";

  const list1 = await User.find({$nor: [{
    _id: req.userId
  }]}, {
    $or: [
      {
        firstname: {
          "$regex": parameter,
        }
      },
      {
        lastname: {
          "$regex": parameter,
        }
      },
    ]
  });

  res.json({
    users: list1.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      userId: user._id
    }))
  });
});

module.exports = userRouter;
