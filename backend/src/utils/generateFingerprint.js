import crypto from "crypto";


export const generateFingerprint = (req) => {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress || 'unknown-ip';


    const userAgent = req.headers['user-agent'] || 'unknown-device';
    const language = req.headers['accept-language'] || 'en';


    const rawData = `${ip}|${userAgent}|${language}`;

    return crypto
        .createHash('sha256')
        .update(rawData)
        .digest('hex');
};
