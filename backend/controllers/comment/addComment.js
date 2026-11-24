const Comment = require("../../models/Comment");

// Şərh əlavə etmək (Yalnız qeydiyyatdan keçmiş istifadəçilər)
const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const productId = req.params.id;
        const userId = req.user.id; // Auth middleware-dən gəlir

        const comment = await Comment.create({
            product: productId,
            user: userId,
            text
        });

        res.status(201).json({ success: true, comment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { addComment };