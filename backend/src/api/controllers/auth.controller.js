import { RegisterDao } from "../../repositories/user.repository.js";
import { bcryptHash } from "../../utils/bcrypt.js";
import { registrationInputValidation } from "../../validation/input.registration.validation.js";
import { cookieOptions } from "../../connections/cookies.connection.js";
import { TOKEN_TYPES } from "../../connections/TOKEN_CONFIG.connection.js";
import { addRefreshTokenToRedis } from "../../repositories/refreshToken.repository.js";
import crypto from "crypto";
import { generateFingerprint } from "../../utils/generateFingerprint.js";

export const register = async (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ success: false, message: "Invalid request. Data is missing." });
        }


        const validation = registrationInputValidation({
            ...req.body,
            pass: req.body.password
        });

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validation.errors
            });
        }

        const { username, displayName, email, pass } = validation.data;
        const hashedPass = await bcryptHash(pass);

        const data = await RegisterDao({ username, displayName, email, hashedPass });

        const sid = crypto.randomUUID();
        const jti = crypto.randomUUID();
        const fprint = generateFingerprint(req);

        const RefreshexpireInDays = parseInt(data.RefreshexpireIn);
        const ttlInSeconds = RefreshexpireInDays * 24 * 60 * 60;
        const milliRefreshexpireIn = ttlInSeconds * 1000;

        await addRefreshTokenToRedis(sid, jti, ttlInSeconds, fprint);

        res.cookie(TOKEN_TYPES.REFRESH, data.RefreshToken, cookieOptions(milliRefreshexpireIn));

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            accessToken: data.accessToken,
        });

    } catch (error) {
        console.error(`[Registration_Controller_Error]:`, error);
        return res.status(500).json({ success: false, message: "Server error." });
    }
};
