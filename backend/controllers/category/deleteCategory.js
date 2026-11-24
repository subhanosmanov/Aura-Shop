const Category = require('../../models/Category');

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: "Category tapılmadı", id: id });
        }
        await Product.deleteMany({ category: id });
        res.status(200).json({
            success: true,
            message: "Kateqoriya uğurla silindi",
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server xətası baş verdi",
            error: error.message
        });
    }
}

module.exports = { deleteCategory };