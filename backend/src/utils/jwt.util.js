import jwt from "jsonwebtoken";
import TOKEN_CONFIG from "../connections/TOKEN_CONFIG.connection.js";

export const signToken = (type, payload) => {
    try {
        const config = TOKEN_CONFIG[type];
        if (!config) {
            throw new Error(`Token type "${type}" is not defined in config`);
        }

        const { secret, expiresIn } = config;

        const jwtOptions = {
            expiresIn: expiresIn,
            issuer: "simchat",
            audience: "chat-audience"
        };

        if (payload.jti) {
            jwtOptions.jwtid = String(payload.jti);
        }

        const token = jwt.sign(
            { ...payload, tokenType: type },
            secret,
            jwtOptions
        );

        return { token, expiresIn };
    } catch (err) {
        console.error("Error signing token:", err.message);
        throw new Error("Could not generate secure token");
    }
};

export const verifyToken = (type, token) => {
    try {
        const config = TOKEN_CONFIG[type];
        if (!config) {
            throw new Error("Invalid token type provided");
        }

        const decoded = jwt.verify(token, config.secret, {
            issuer: "simchat",
            audience: "chat-audience",
            clockTolerance: 30
        });

        if (decoded.tokenType !== type) {
            throw new Error("Wrong token type used for this route");
        }

        return decoded;
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            throw new Error("expired");
        }

        console.log("JWT Verify Error:", err.message);
        throw new Error("invalid_token");
    }
};
