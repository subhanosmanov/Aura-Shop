const Product = require("../../models/Product");

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id).populate('category');

        if (!deletedProduct) {
            return res.status(404).json({ message: "Məhsul tapılmadı" });
        }
        res.status(200).json({
            message: "Məhsul uğurla silindi",
            product: deletedProduct
        });
    } catch (error) {
        res.status(500).json({ message: 'Xəta baş verdi', error: error.message });
    }
};

module.exports = { deleteProduct };