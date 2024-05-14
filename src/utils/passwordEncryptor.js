const bcrypt = require('bcryptjs');

// Function to hash password
const hashPassword = async (password) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);
        
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};





module.exports = hashPassword;