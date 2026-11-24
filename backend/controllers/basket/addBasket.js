const User = require("../../models/User");

const addBasket = async (req, res) => {
    try {
        const { productId } = req.body; // İstifadənizə görə userId req.user._id də ola bilər
        const userId = req.user.id;
        
        // İstifadəçini tapırıq
        const user = await User.findById(userId);
        console.log("gelen basket-list: ", user.basketList);
        if (!user) {
            return res.status(404).json({ success: false, message: "İstifadəçi tapılmadı" });
        }

        // Məhsul artıq basketList-də varmı yoxlayırıq
        const isProductInBasket = user.basketList.includes(productId);

        let updatedUser;

        if (isProductInBasket) {
            // Əgər artıq səbətdə varsa, $pull ilə silirik
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { basketList: productId } },
                { new: true }
            ).populate("basketList");

            return res.status(200).json({
                success: true,
                message: "Məhsul səbətdən silindi",
                basket: updatedUser.basketList
            });
        } else {
            // Yoxdursa, $push ilə əlavə edirik
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { basketList: productId } },
                { new: true }
            ).populate("basketList");

            return res.status(201).json({
                success: true,
                message: "Məhsul uğurla səbətə əlavə edildi",
                basket: updatedUser.basketList
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Xəta baş verdi', error: error.message });
    }
}


module.exports = { addBasket };