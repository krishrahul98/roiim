const express = require("express");

const paymentController = require("../controllers/payment-controller");

const router = express.Router();

router.post("/payment", paymentController.postPayment);

router.post("/customer-token", paymentController.postCustomerToken);

module.exports = router;
