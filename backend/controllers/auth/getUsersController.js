const User = require('../../models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Şifrələri gizlədib digər məlumatları çəkirik
        res.status(200).json({
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({ message: 'Xəta baş verdi', error: error.message });
    }
}

module.exports = getUsers;