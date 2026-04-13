const express = require('express');
const router = express.Router();
const payCtrl = require('../controllers/paymentController');

router.post('/capturePayment', payCtrl.capturePayment);
router.post('/verifyPayment', payCtrl.verifyPayment);
router.post('/sendPaymentSuccessEmail', payCtrl.sendPaymentSuccessEmail);

module.exports = router;
