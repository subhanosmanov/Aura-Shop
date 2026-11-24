const Category = require('../../models/Category');

const createCategory = async (req, res) => {
    try {
        const { name, slug, image } = req.body;
        const category = new Category({ name, slug, image });
        await category.save();
        res.status(201).json({
            success: true,
            message: "Kateqoriya uğurla yaradıldı",
            category: category
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createCategory };