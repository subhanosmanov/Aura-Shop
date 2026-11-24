const Product = require("../../models/Product");

// Məhsulları ana səhifə üçün çəkmək (populate ilə)
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category', 'name slug');

        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getProducts };