const User = require('../models/userModel');
const Otp = require('../models/otpModel');
const sendMail = require('../utilities/sendMail');
const generateOtp = require('../utilities/generateOTP');
require('dotenv').config();
const path = require('path');

const register = async (req, res, next) => {
    try {
        const { first_name, last_name, phone, email, address, password, subscription, payment_method, payment_info } = req.body;
        const id_picture = req.file?.path;
        console.log(req.body);
        console.log(id_picture);

        if (!first_name || !last_name || !phone || !email || !address || !password || !subscription || !payment_method || !payment_info || id_picture) {
            return res.status(400).send("All fields are required.");
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User with this email already exists.");
        }

        // Generate OTP
        const otpCode = generateOtp();
        const otpExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes from now

        // Save OTP in database
        const otp = new Otp({ email, otp: otpCode, expiresAt: otpExpiry });
        await otp.save();

        console.log(`OTP Saved to the database`);

        // Send OTP via email
        await sendMail({
            email: email,
            subject: 'Your OTP Code',
            template: 'activation_mail.ejs', // Adjust the template name as needed
            data: { first_name, last_name, otp: otpCode }
        });
        console.log(`Email Sent to ${email}`);

        res.status(200).send('OTP sent to your email address.');
    } catch (error) {
        next(error);
    }
};

const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const otpRecord = await Otp.findOne({ email, otp });

        if (!otpRecord || otpRecord.expiresAt < Date.now()) {
            return res.status(400).send('Invalid or expired OTP.');
        }
        console.log(`OTP is correct`)
        // OTP is valid, delete the OTP record
        await Otp.deleteOne({ email, otp });

        // Save user to database
        const user = new User(req.body);
        await user.save();

        res.status(200).send(`User ${user.first_name} ${user.last_name} registered successfully.`);
    } catch (error) {
        next(error);
    }
};

module.exports = { register, verifyOtp };