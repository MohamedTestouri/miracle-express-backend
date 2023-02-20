// Import mongoose and bcrypt
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load environment variables
require("dotenv").config();

// Define the User schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name is required"],
        minlength: [5, "Name should be at least 5 characters long"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: function (v) {
                return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password should be at least 8 characters long"],
    },
    isActive: { type: Boolean, default: false },
    resetCode: { type: Number },
});

// Add a pre-save hook to encrypt the password using bcrypt
userSchema.pre("save", async function () {
    if (this.password) {
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ENCRYPTION));
        this.password = await bcrypt.hash(this.password, salt);
    }
});

// Create the User model
const User = mongoose.model("User", userSchema);

// Export the User model as a module
module.exports = { User };
