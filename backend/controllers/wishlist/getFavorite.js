const User = require('../../models/User');

const getFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('wishList');
        res.status(200).json({ success: true, message: "Sevimlilərdən oxuduldu", favorities: user.wishList });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getFavorite };