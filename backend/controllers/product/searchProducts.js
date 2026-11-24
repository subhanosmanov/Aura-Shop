const Product = require("../../models/Product");

// Məhsul axtarışı
const searchProducts = async (req, res) => {
    try {
        const { query, max } = req.query; // URL-dən gələn axtarış sözü: /api/products/search?query=telefon
        
        console.log(query,max, "gelen query budur1");
        if (!query) {
            return res.status(400).json({ success: false, message: "Axtarış sözü daxil edilməyib!" });
        }

        // Adına (name) və ya təsvirinə (description) görə axtarış
        const searchRegex = new RegExp(query, 'i');

        const products = await Product.find({
            $or: [
                { title: searchRegex },
                { description: searchRegex }
            ]
        });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Xəta baş verdi', error: error.message });
    }
};

module.exports = { searchProducts };