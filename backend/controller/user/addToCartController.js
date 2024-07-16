const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;

    // Validação de entrada
    if (!productId || !currentUser) {
      return res.status(400).json({
        message: "Product ID and user ID are required.",
        success: false,
        error: true
      });
    }

    const isProductAvailable = await addToCartModel.findOne({
      productId,
      userId: currentUser
    });

    console.log("isProductAvailable: ", isProductAvailable);

    if (isProductAvailable) {
      return res.status(409).json({
        message: "Product already exists in cart.",
        success: false,
        error: true
      });
    }

    const payload = {
      productId,
      quantity: 1,
      userId: currentUser
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.status(201).json({
      data: saveProduct,
      message: "Product added to cart successfully.",
      success: true,
      error: false
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Internal server error.",
      success: false,
      error: true
    });
  }
};

module.exports = addToCartController;
