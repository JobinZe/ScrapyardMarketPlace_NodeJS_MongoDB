const express = require('express');
const router = express.Router()
const verifyToken = require("../middlewares/tokenverification");
const counterOfferController = require("../controllers/counter-offer-controller");
console.log("entered counter section")
router.post('/counter-offer/:id',verifyToken,counterOfferController.counterOffer);
router.get('/counter-offer-exist',verifyToken,counterOfferController.counterExists);
router.get('/display-counter-offer',verifyToken,counterOfferController.displayCounterOffers);
router.post('/accept-reject-counter-offer/:id',verifyToken,counterOfferController.RejectOrAcceptCounter);
router.get('/accepted-counter',verifyToken,counterOfferController.acceptedCounter)
module.exports = router;
