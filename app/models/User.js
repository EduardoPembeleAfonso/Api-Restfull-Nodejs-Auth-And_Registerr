const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

module.exports = () => {
    const UserSchema = new Schema({
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: true,
            minLength: 9
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            select: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

    // encriptando a senha antes de salvar no banco
    UserSchema.pre('save', async function(next) {
        const user = this;
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 10);
        }
        next()
    });

    const User = mongoose.model('User', UserSchema);
    return { User }

}