const Product = require("../../models/Product");

const createProduct = async (req, res) => {
    try {
        const { title, description, price, stock, category } = req.body;

        let imageUrl = '';
        console.log("Gələn body:", req.body);
        console.log("Gələn file:", req.file);
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }
        const newProduct = new Product({
            title,
            description,
            price,
            stock,
            images: imageUrl,
            category // Bura həmin kateqoriyanın ID-si gələcək (məsələn: "670f1234abcd...")
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Məhsul uğurla əlavə edildi",
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createProduct };