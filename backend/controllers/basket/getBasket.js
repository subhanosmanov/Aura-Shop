const User = require("../../models/User");

const getBasket = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(404).json({ success: false, message: "İstifadəçi tapılmadı" });
        }
        const user = await User.findById(userId).populate("basketList");
        console.log("gelen user: ", user);
        const result = user.basketList;

        return res.status(201).json({
            success: true,
            message: "Məhsullar uğurla getirildi!",
            basket: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Xəta baş verdi",
            error: error.message // <-- error yerinə error.message yazın
        });
    }
}

module.exports = { getBasket };