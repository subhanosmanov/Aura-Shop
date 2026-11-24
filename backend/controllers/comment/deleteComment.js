const Comment = require("../../models/Comment");

// Şərhi silmək (Admin istənilən şərhi, istifadəçi yalnız öz şərhini silə bilər)
const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ success: false, message: "Şərh tapılmadı" });
        }

        // Əgər istifadəçi admindirsə VƏ YA şərhi yazan şəxsin özüdürsə silməyə icazə ver
        if (req.user.role === 'admin' || comment.user.toString() === req.user.id.toString()) {
            await comment.deleteOne();
            return res.status(200).json({ success: true, message: "Şərh silindi" });
        }

        res.status(403).json({ success: false, message: "Bu şərhi silməyə icazəniz yoxdur" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = { deleteComment };