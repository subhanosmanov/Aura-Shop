const Product = require("../../models/Product");

const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ category: categoryId }).populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Xəta baş verdi', error: error.message });
    }
};

module.exports = { getProductsByCategory };