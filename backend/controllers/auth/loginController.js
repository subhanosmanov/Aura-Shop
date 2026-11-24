const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const adminEmail = 'admin@aurashop.com';
        const adminRawPassword = 'admin12345';

        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const hashedAdminPassword = await bcrypt.hash(adminRawPassword, 10);
            await User.create({
                name: 'Admin',
                email: adminEmail,
                password: hashedAdminPassword,
                role: 'admin'
            });
        }

        // 1. İstifadəçini tapaq
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email və ya şifrə yanlışdır!' });
        }

        // 2. Şifrəni yoxlayaq
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email və ya şifrə yanlışdır!' });
        }

        // 3. JWT Token yaradaq
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // 4. HttpOnly Cookie yazılması
        // 4. HttpOnly Cookie yazılması
        res.cookie('token', token, {
            httpOnly: true,    // JavaScript (localStorage) oxuya bilməz, XSS hücumlarından qoruyur
            secure: process.env.NODE_ENV === 'production', // Localhost-da (HTTP) false, canlıda (HTTPS) true olur
            sameSite: 'lax',   // Fərqli portlar/domainlər arası (localhost:3000 -> localhost:5000) işləməsi üçün 'lax' ən yaxşı seçimdir
            maxAge: 24 * 60 * 60 * 1000 // 1 gün
        });

        res.status(200).json({
            message: 'Uğurla daxil oldunuz! 🚀',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Xəta baş verdi', error: error.message });
    }
}

module.exports = loginUser;