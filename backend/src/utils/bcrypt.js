import bcrypt from "bcrypt"

const salt_round = 12;

export const bcryptHash = async (plaintext) => {

    try {
        const hashed = await bcrypt.hash(plaintext, salt_round);
        return hashed
    } catch (error) {
        console.error("Hashing error:", err);
        throw err;
    }

}

export const verifyHash = async (plainText, storedHash) => {
    const isMatch = await bcrypt.compare(plainText, storedHash);
    return isMatch;
}
