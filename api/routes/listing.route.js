const express= require("express");
const router= express.Router();

const {verifyToken}= require('../utils/verifyUser');
const {createListing,deleteListing,updateListing}= require('../controllers/listing.controller');

router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/update/:id', verifyToken, updateListing);

module.exports= router;