const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {config} = require("../config/secret");

const usersSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    date_created:{
        type:Date, default:Date.now()
      },
      role:{
        type:String, default:"user"
      },
        //חיפושים אחרונים שהמשתמש ביצע באפליקצייה
    last_search_ar:{
       type:Array, default:[]
  }
})
exports.UserModel = mongoose.model("users",usersSchema);


exports.createToken = (user_id,role) =>{
    let token = jwt.sign({_id:user_id, role:role},config.tokenSecret,{expiresIn:"60mins"})
    return token;
}


// sign up => validation
exports.validateUser = (reqBody) =>{
    let joiSchema = Joi.object({
        name:Joi.string().min(2).max(150).required(),
        email:Joi.string().min(2).max(150).email().required(),
        password:Joi.string().min(3).max(150).required()
    })
    return joiSchema.validate(reqBody);
}


// login => validation
exports.validateLogin = (reqBody) =>{
    let joiSchema = Joi.object({
        email:Joi.string().min(2).max(150).email().required(),
        password:Joi.string().min(3).max(150).required()
      })
      return joiSchema.validate(reqBody);
}

