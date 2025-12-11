module.exports = function (req, res, next) {
  const { shippingInfo, paymentMethod } = req.body;

  if (!shippingInfo || !paymentMethod)
    return res.status(400).json({ message: "Missing required fields" });

  next();
};
