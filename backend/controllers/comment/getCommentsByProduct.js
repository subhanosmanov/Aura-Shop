const Comment = require("../../models/Comment");

// Məhsula aid şərhləri oxumaq
const getCommentsByProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const comments = await Comment.find({ product: productId }).populate("user").sort("-createdAt");

        res.status(200).json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getCommentsByProduct };