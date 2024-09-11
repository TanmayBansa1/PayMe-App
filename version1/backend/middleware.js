const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")
const jwt_secret = require("./config")

const authMiddleware = (req,res,next)=>{

    // const bearer = req.headers.Authorization;
    // // if(!bearer.startsWith('Bearer ')){
    // //     return res.status(403).json({});
    // // }
    // console.log(bearer);

    // const token = bearer.split(' ')[1];

    // const verification = jwt.verify({token},jwt_secret);

    // if(verification){

    //     req.userId = verification.userId;
    //     next();
    // }
    // else{
    //     return res.status(403).json({

    //     })
    // }
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            msessage: "no"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwt_secret);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({
            message: "error while authenticating"
        });
    }

}

module.exports = {
    authMiddleware
}