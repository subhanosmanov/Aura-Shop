const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ad qeyd olunmalıdır']
    },
    email: {
        type: String,
        required: [true, 'Email qeyd olunmalıdır'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Şifrə qeyd olunmalıdır'],
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Yalnız bu dəyərlərdən birini ala bilər
        default: 'user'          // Qeydiyyatdan keçəndə avtomatik 'user' təyin olunur
    },
    basketList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    wishList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);