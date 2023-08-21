const mongoose = require("mongoose");
const Joi = require("joi");


const productSchema = new mongoose.Schema({
    name:String,
    price:String,
    description:String,
    category:String, 
    gender:String,
    img_url:String,
    short_id:Number,
    user_id: String,
})
exports.ProductModel = mongoose.model("products",productSchema);


exports.validateJoi = (_reqBody) => {
    let joiSchema = Joi.object({
      name: Joi.string().min(1).max(150).required(),
      price: Joi.string().min(1).max(9999).required(),
      description: Joi.string().min(1).max(999).required(),
      category: Joi.string().min(1).max(50).required(),
      gender: Joi.string().min(1).max(20).required(),
      img_url: Joi.string().min(1).max(500).allow(null,""),
      
    })
    return joiSchema.validate(_reqBody)
  }
