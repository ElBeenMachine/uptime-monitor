// Import the required modules
import crypto from "crypto";

interface optionsInterface {
    defaultImage?: string;
    size?: number;
}

/**
 * Function to get the Gravatar URL for a given email address.
 *
 * @param {string} email The email address to get the Gravatar for
 * @param {optionsInterface} options The options for the Gravatar
 * @returns {string} The URL of the Gravatar
 */
function getGravatar(email: string = "admin@example.com", options: optionsInterface = {}) {
    const defaultImage = options.defaultImage || "mp";
    const size = options.size || 1024;

    const emailHash = crypto.createHash("md5").update(email).digest("hex");
    return `https://www.gravatar.com/avatar/${emailHash}?d=${defaultImage}&s=${size}`;
}

export { getGravatar };
