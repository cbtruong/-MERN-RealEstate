const express= require("express");
const router= express.Router();

const {verifyToken} = require('../utils/verifyUser.js');
const {test, updateUser,deleteUser,getUserListings}= require('../controllers/user.controller');

router.get("/",test);
router.post("/update/:id",verifyToken,updateUser);
router.delete("/delete/:id",verifyToken,deleteUser);
router.get("/listings/:id",verifyToken,getUserListings);

module.exports= router;