import { RegisterDao } from "../../repositories/user.repository.js";
import { bcryptHash } from "../../utils/bcrypt.js";

export const register = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Body missing" });
        }

        const { username, displayName, email, password } = req.body;

        const hashedPass = await bcryptHash(password);

        await RegisterDao({ username, displayName, email, password: hashedPass });

        return res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};
