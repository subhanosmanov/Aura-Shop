const User = require('../../models/User');

const getMeProfile = async (req, res) => {
    try {
        // req.user.id token-dən gəlir (kimin silmək istədiyini dəqiq bilirik)
        const userId = req.user.id;

        const user = await User.findById(userId).select('-password').populate("basketList");

        if (!user) {
            return res.status(404).json({ message: 'İstifadəçi tapılmadı!' });
        }

        res.status(200).json({ message: 'Hesabınız uğurla tapıldu! 🗑️' , user});

    } catch (error) {
        res.status(500).json({ message: 'Hesab axtarılarken baş verdi', error: error.message });
    }
};

module.exports = getMeProfile;