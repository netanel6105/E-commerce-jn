const express = require('express');
const { validateJoi, ProductModel } = require('../models/productModel');
const { random } = require('lodash');
const { authAdmin } = require('../middleware/auth');
const { CategoryModel } = require('../models/categoryModel');
const router = express.Router();

//localhost:3001/products?cat=arcade
router.get("/", async (req, res) => {
    let perPage = Math.min(req.query.perPage,100) || 5;
    let page = Number(req.query.page) || 1
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1;
    let cat = req.query.cat;
    let gender = req.query.gender;
    let search = req.query.search;
    try {
        let findQuery = {};
        if (cat) {
            findQuery = { category: cat }
        } else if (gender) {
            findQuery = { gender: gender }
        }else if(search){
            let searchExp = new RegExp(search,"i");
            // findQuery = {$or:[{name:searchExp},{info:searchExp}]}
            findQuery = {name:searchExp};
          }
        let data = await ProductModel
            .find(findQuery)
            .limit(perPage)
            .skip((page - 1) * perPage)
            // .sort({ [sort]: reverse })
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

//localhost:3001/products/single/63b14e328974ec3b2dcf69b3
router.get("/single/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let data = await ProductModel.findOne({ _id: id });
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.post("/groupApp", async(req,res)=>{
    try{
      let data = await ProductModel.find({"_id":{$in:req.body.ids}}).limit(20)
      // let data = await GamesAppsModel.find({"_id":{$in:["63b14d7d8974ec3b2dcf69b1",
      // "63b14e328974ec3b2dcf69b3",
      // "63b14eb78974ec3b2dcf69b5"]}})
      res.json(data);
    }
    catch(err){
      console.log(err);
      res.status(502).json({err})
    }
  })
  



  router.get("/byGender/:gender", async(req,res) => {
    try{
      let gender = req.params.gender;
      let data = await ProductModel.find({gender: gender});
      res.json(data);
    }
    catch(err){
      console.log(err);
      res.status(502).json({err})
    }
  })



//localhost:3001/products/count?perPage=2&cat=aciton
  //localhost:3001/products/count?perPage=2
router.get("/count", async (req, res) => {
    let perPage = Number(req.query.perPage) || 5;
    let cat = req.query.cat;
    let gender = req.query.gender;
    try {
        let findQuery = {};
        if (cat) {
            findQuery = { category: cat }
        } else if (gender) {
            findQuery = { gender: gender }
        }

        let count = await ProductModel.countDocuments(findQuery);
        let pages = Math.ceil(count / perPage);
        res.json({ count, pages });
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})


router.post("/", authAdmin, async(req,res)=>{

    let validBody = validateJoi(req.body);
    if (validBody.error) {
        return res.status(401).json(validBody.error.details)
    }

    try {  
         const isCategory = await CategoryModel.findOne({category_id:req.body.category})
        if(isCategory){
            let product = new ProductModel(req.body);
            product.user_id = req.tokenData._id;
            product.short_id = await createShortId();
            await product.save();
          
            let category = await CategoryModel.findOne({category_id: product.category})
            if(!category){
                return res.status(404).json({err_msg:'category not found'})
            }

            const obj = {product_id:product._id,product_name:product.name}
             category.products.push(obj); 
            await category.save();
            
            return res.status(201).json(product);
        }
        return res.status(401).json({err_msg: "You cannot create product for a category that does not exist."})
        
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})

router.put("/:id",authAdmin, async(req,res)=>{
    let validBody = validateJoi(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try{
        let id = req.params.id;
        let data;
        if (req.tokenData.role == "admin") {
            data = await ProductModel.updateOne({ _id: id }, req.body);
        }
        else {
            data = await ProductModel.updateOne(
            { _id: id, user_id: req.tokenData._id }, req.body);
        }
         res.json(data); 

    }
    catch(err){
        console.log(err);
        res.status(502).json({err})
    }
} )

router.delete("/:id", authAdmin, async (req, res)=>{
    try {
        const productId = req.params.id;
        const product = await ProductModel.findOne({_id:productId});
        const categoryProductId = product.category;
        
        if(!product){
            return res.status(404).json({err_msg:'product not found',status:false})
        }


        if(req.tokenData.role == 'admin' || req.tokenData._id == product.user_id){
            const category = await CategoryModel.findOne({category_id:categoryProductId})
            if(!category){
                return res.status(404).json({err_msg:'category not found',status:false})
            }
           const data = await ProductModel.deleteOne({_id:productId})
            if(data.deletedCount != 1){
                return res.status(404).json({err_msg:'somthing wrong try again',status:false})
            }

           category.products = category.products.filter((prod)=>prod.product_id!= productId)
           await category.save()
           return res.status(200).json({msg:'product deleted',status:true})
        }

        return res.status(404).json({err_msg:'you dont have acces to this end-point',status:false})

    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// יוצר id מקוצר
const createShortId = async() =>{
    try{
        while(true){
            let rnd = random(0,9999);
            let product = await ProductModel.findOne({short_id:rnd});

            if(!product){
                return rnd;
            }
        }
    }
    catch(err){
       return err
    }
}

module.exports = router;





