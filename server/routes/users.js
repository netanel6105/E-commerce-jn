const express = require('express');
const jwt = require("jsonwebtoken");
const { validateUser, createToken, UserModel, validateLogin } = require('../models/userModel');
const bcrypt = require("bcrypt");
const { config } = require("../config/secret")
const { auth, authAdmin } = require("../middleware/auth");
const router = express.Router();





router.get("/", async (req, res) => {
    res.json({ msg: 'users Work 200' });
})

router.get("/checkToken", auth , async(req,res) =>{
    res.json(req.tokenData);
})


// auth -> פונקציית MIDDLEWARE
router.get("/myInfo", auth, async (req, res) => {
    try {
        let data = await UserModel.findOne({ _id: req.tokenData._id },
         { password: 0 })
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })

    }
})


// get all users to admin.
router.get("/allUsers", authAdmin, async(req,res)=>{
    let perPage = Math.min(req.query.perPage,20) || 5;
    let page = Number(req.query.page) || 1
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? 1 : -1;

    try{
        let data = await UserModel.find({},{password:0})
        .limit(perPage)
        .skip((page-1)* perPage)
        .sort({ createdAt: -1})
        // .sort({ [sort]: reverse })
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(502).json({err})
    }
})


router.get("/count", async(req,res) => {
    let perPage = Number(req.query.perPage) || 5;
   
    
    try{
      let findQuery = {};
      // בשביל צד לקוח שנעשה עמוד קטגוריה שנוכל לדעת לאותה קטגוריה כמה עמודים יש
    
      let count = await UserModel.countDocuments(findQuery);
      // מחזיר את מספר העמודים לפי פר פייג'
      let pages = Math.ceil(count/perPage);
      res.json({count, pages})
  
    }
    catch(err){
      console.log(err);
      res.status(502).json({err})
    }
  })
    


//  todo : לשאול איך עושים עם שתי אדמינים 
router.patch("/role",authAdmin, async(req,res)=>{
    try{
        let user_id = req.query.user_id;
        let role = req.query.role;

        if(user_id == req.tokenData._id || user_id == '63ee1669477d2e80efdbe12a'){
            return res.status(401).json({msg:"You try to change yourself or the superadmin , anyway you are stupid!"})
        }
        let data = await UserModel.updateOne({_id:user_id},{role})
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(502).json({err})
    }
})



//creat new user
router.post("/", async (req, res) => {
    let validBody = validateUser(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let user = new UserModel(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();

        user.password = "*****";
        res.status(201).json(user);
    }
    catch (err) {
        if (err.code == 11000) {
            return res.status(401).json({ msg: "Email already in system, try log in", code: 11000 })
        }
        console.log(err);
        res.status(500).json(err);
    }

})


router.post("/login", async (req, res) => {
        let validBody = validateLogin(req.body);
        if (validBody.error) {
            return res.status(400).json(validBody.error.details);
        }

        try {
            // לבדוק אם מייל קייים בכלל במערכת
            let user = await UserModel.findOne({ email: req.body.email })
            if (!user) {
                return res.status(401).json({ msg: "User or password not match , code:1",error_code:1 })
            }
            // שהסיסמא שהגיעה מהבאדי בצד לוקח תואמת לסיסמא המוצפנת במסד
            let passordValid = await bcrypt.compare(req.body.password, user.password)
            if (!passordValid) {
                return res.status(401).json({ msg: "User or password not match , code:2",error_code:2 })
            }
            let token = createToken(user._id, user.role);
            res.json({ token: token })
        }

        catch (err) {
            console.log(err);
            res.status(502).json({ err })
        }
    })


    router.patch("/updateSearch",auth, async(req,res) =>{
        const search_ar = req.body.search_ar || [];
        try{
            if(search_ar.length == 0 || search_ar.length > 20){
                return res.status(400).json({err:"You must send array of search_ar with min 1 cell and max 20 cells "})
              }
              // TODO: check if the cell string is less than 30 chars , 
              const data = await UserModel.updateOne({_id:req.tokenData._id},{last_search_ar:search_ar});
              res.json(data);
        }
        catch(err){
            console.log(err);
            res.status(502).json({err})
        }
    })

    router.delete("/:id", authAdmin, async(req,res)=>{
      try{
        let id = req.params.id;
        let data = await UserModel.deleteOne({_id:id})
        res.json(data);
      }
      catch(err){
        console.log(err);
        res.status(502).json({err})
      }
       

    })

   

module.exports = router;