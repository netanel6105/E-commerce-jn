const mongoose = require("mongoose");
const Joi = require("joi");

const prodObj = {
  product_name: String,
  product_id: {
    type: mongoose.Types.ObjectId,
    ref: "products",
  },
};

const categorySchema = new mongoose.Schema({
  name: String,
  info: String,
  img_url: String,
  category_id: String,
  products: [prodObj],
});

exports.CategoryModel = mongoose.model("categories", categorySchema);

exports.validateCategory = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    info: Joi.string().min(1).max(999).required(),
    img_url: Joi.string().min(1).max(500).allow(null, ""),
    category_id: Joi.string().min(1).max(100).required(),
  });
  return joiSchema.validate(_reqBody);
};
