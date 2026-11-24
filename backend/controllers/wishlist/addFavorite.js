const User = require('../../models/User');

const addFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body; // Frontend-dən göndərilən məhsul ID-si

        const user = await User.findById(userId);

        // Yoxlayaq məhsul artıq favorilərdə var ya yox
        console.log(productId, "gelen productId")
        const isProductInWishList = user.wishList.includes(productId);

        if (isProductInWishList) {
            // Varsa çıxarırıq
            // Əgər artıq səbətdə varsa, $pull ilə silirik
            user.wishList.pull(productId);
            await user.save();
            return res.status(200).json({ success: true, message: "Sevimlilərdən çıxarıldı", favorites: user.wishList });
        } else {
            // Yoxdursa əlavə edirik
            user.wishList.push(productId);
            await user.save();
            return res.status(200).json({ success: true, message: "Sevimlilərə əlavə edildi", favorites: user.wishList });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { addFavorite };