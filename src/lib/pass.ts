// Import bcrypt
import bcrypt from "bcrypt";

/**
 * Function to hash a plaintext password using bcrypt.
 *
 * @param {string} password The plaintet password to be hashed
 * @returns {string} The hashed password
 */
export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

/**
 * Function to compare a plaintext password to a hashed password.
 *
 * @param {string} password The plaintext password to check
 * @param {string} hash The hashed password to compare against
 * @returns {boolean} Whether the password matches the hash
 */
export async function comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}
