const bcrypt = require("bcryptjs");

const User = require("../models/user.model").User;

/**
 * Handles user signup and creates a new user with the given information.
 * @param {Object} userData - An object containing user information.
 * @returns {Promise} A promise that resolves to the newly created user.
 */
async function signup(userData) {
    const user = new User(userData);
    return user.save();
}

/**
 * Handles user login by finding the user with the given email and verifying the password.
 * @param {string} email - The email of the user to login.
 * @param {string} password - The password to verify.
 * @returns {Promise} A promise that resolves to the authenticated user or null if the email or password is incorrect.
 */
async function login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        return null; // user not found
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return null; // invalid password
    }
    return user;
}

/**
 * Handles account activation by finding the user with the given reset code and setting the isActive flag to true.
 * @param {string} email - The email of the user to activate.
 * @param {number} resetCode - The reset code to verify.
 * @returns {Promise} A promise that resolves to the activated user or null if the email or reset code is incorrect.
 */
async function activateAccount(email, resetCode) {
    const user = await User.findOne({ email, resetCode });
    if (!user) {
        return null; // user not found
    }
    user.isActive = true;
    user.resetCode = null;
    return user.save();
}

/**
 * Handles password reset by finding the user with the given reset code and setting a new password.
 * @param {string} email - The email of the user to reset the password for.
 * @param {number} resetCode - The reset code to verify.
 * @param {string} newPassword - The new password to set.
 * @returns {Promise} A promise that resolves to the updated user or null if the email or reset code is incorrect.
 */
async function resetPassword(email, resetCode, newPassword) {
    const user = await User.findOne({ email, resetCode });
    if (!user) {
        return null; // user not found
    }
    user.password = newPassword;
    user.resetCode = null;
    return user.save();
}

module.exports = {
    signup,
    login,
    activateAccount,
    resetPassword,
};
