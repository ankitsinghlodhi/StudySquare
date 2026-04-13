// minimal Razorpay stub — for full integration use razorpay SDK with keys
exports.capturePayment = async (req,res) => {
  // frontend expects success structure; return mock order id / details
  return res.json({ success: true, order: { id: "order_mock_123", amount: req.body.amount || 100 }});
};

exports.verifyPayment = async (req,res) => {
  // verify signature in real app. Here just return success
  return res.json({ success: true, message: "Payment verified (mock)"});
};

exports.sendPaymentSuccessEmail = async (req,res) => {
  // in production send email via nodemailer
  return res.json({ success:true });
};
