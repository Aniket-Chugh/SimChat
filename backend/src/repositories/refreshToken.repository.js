import { redisClient } from "../connections/redis.connection.js";


export const addRefreshTokenToRedis = async (sid, jti, ttlInSeconds, fprint) => {
    try {
        const sessionData = JSON.stringify({ jti, fprint });

        await redisClient.set(`session:${sid}`, sessionData, {
            EX: ttlInSeconds
        });
        console.log(`✅ Session ${sid} whitelisted with Fingerprint monitoring.`);
    } catch (error) {
        console.error("Redis Store Error:", error);
        throw new Error("Could not save session to cache");
    }
};

export const getActiveJti = async (sid) => {
    try {
        const jti = await redisClient.get(`session:${sid}`);
        return jti;
    } catch (error) {
        console.error("Redis Retrieval Error:", error);
        return null;
    }
};

export const getSessionData = async (sid) => {
    try {
        const data = await redisClient.get(`session:${sid}`);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Redis Retrieval Error:", error);
        return null;
    }
};
