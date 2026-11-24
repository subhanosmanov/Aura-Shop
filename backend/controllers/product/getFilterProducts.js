const Category = require("../../models/Category");
const Product = require("../../models/Product");

// Məhsulları filter çəkmək (populate ilə)
const getFilterProducts = async (req, res) => {
    try {
        const { minPrice, maxPrice, sortBy, categoryId } = req.query;
        let filter = {};

        // Qiymət filteri
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Kateqoriya filteri
        if (categoryId) {
            const category = await Category.findById(categoryId);
            console.log(category, "gelen category filteren");
            filter.category = category;
        }

        let query = Product.find(filter).populate('category', 'name slug');

        // Sıralama (Sort)
        if (sortBy) {
            query = query.sort(sortBy);
        } else {
            query = query.sort({ createdAt: -1 });
        }

        const products = await query;

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getFilterProducts };