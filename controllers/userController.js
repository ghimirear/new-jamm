// import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken";
// import User from "../models/User";
const bcrypt = require('bcrypt');
 const jwt = require ("jsonwebtoken")
 const User = require("../models/User")
// signin
  const signin = async (req, res)=>{
    console.log(req.body);
    const {email, password}= req.body;
    try{
        const existingUser = await User.findOne({email:email})
        if(!existingUser)return res.status(404).json({message:"user doesnot exists."});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect)return res.status(400).json({message: "invalid email or password"});
        const token = jwt.sign({email: existingUser.email, id:existingUser._id}, "test", {expiresIn: "1h"});
        res.status(200).json({result: existingUser, token});
        // res.cookie('jwt', token, {httpOnly:true,secure: true, maxAge: 1000*60*60}) may be work for cookie
    }catch (error){
        res.status(500).json({message: "something went wrong"});
    }
}

// signup
  const signup = async(req, res)=>{
    console.log(req.body);
const {email,password, confirmPassword, firstName, lastName } = req.body;
try{
    const existingUser =await User.findOne({email:email});
    if(existingUser) return res.status(400).json({message: "user already exists"});
    if(password !== confirmPassword)return res.status(400).json({message: "Password don't match"});
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
     email:email, password:hashedPassword, firstName:firstName, lastName:lastName 
    })
    const token = jwt.sign({email: result.email, id:result._id}, "test", {expiresIn: "1h"});
    res.status(200).json({result:result, token})
}
catch(error){
    res.status(500).json({message: "something went wrong"});
}
}
 module.exports={signup, signin}