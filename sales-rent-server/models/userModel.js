const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    address: {
        Wereda: {
            type: String,
            required: true
        },
        Sub_city: {
            type: String,
            required: true
        },
        City: {
            type: String,
            required: true
        },
        Country: {
            type: String,
            required: true
        }
    },
    password: {
        type: String,
        required: true
    },
    subscription: {
        type: String,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    payment_info: {
        Card: {
            type: String,
            required: true
        },
        Number: {
            type: String,
            required: true
        },
        CVV: {
            type: String,
            required: true
        },
        Expiry_Date: {
            type: String,
            required: true
        }
    },
    id_picture: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('PropertyOwner', userSchema);