const express= require("express");
const router= express.Router();

const {verifyToken} = require('../utils/verifyUser.js');
const {test, updateUser}= require('../controllers/user.controller');

router.get("/",test);
router.post("/update/:id",verifyToken,updateUser);

module.exports= router;