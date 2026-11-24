const User = require('../../models/User');

const deleteUser =  async (req, res) => {
    try {
        // req.user.id token-dən gəlir (kimin silmək istədiyini dəqiq bilirik)
        const userId = req.user.id;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'İstifadəçi tapılmadı!' });
        }

        res.status(200).json({ message: 'Hesabınız uğurla silindi! 🗑️' });

    } catch (error) {
        res.status(500).json({ message: 'Hesab silinərkən xəta baş verdi', error: error.message });
   }
};

module.exports = deleteUser;