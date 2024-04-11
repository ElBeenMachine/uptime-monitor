// Import bcrypt
import bcrypt from "bcrypt";

/**
 * Function to hash a plaintext password using bcrypt.
 *
 * @param {string} password The plaintet password to be hashed
 * @returns {string} The hashed password
 */
async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export { hashPassword };
