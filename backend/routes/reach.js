const express = require('express');
const router = express.Router();
router.post('/contact', (req,res) => res.json({success:true, msg:'Message received (mock)'}));
module.exports = router;
