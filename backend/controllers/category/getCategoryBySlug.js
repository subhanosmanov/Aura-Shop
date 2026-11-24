const Category = require('../../models/Category');

const getCategoryBySlug = async (req, res) => {
    try {
        const { slug } = req.params; // URL-dən "beauty" sözünü götürürük

        const category = await Category.findOne({ slug });

        if (!category) {
            return res.status(404).json({ success: false, message: "Kateqoriya tapılmadı" });
        }

        res.status(200).json({ success: true, category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getCategoryBySlug };