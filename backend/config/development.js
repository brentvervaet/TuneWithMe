module.exports = {
    auth: {
        jwt: {
            secret: process.env.AUTH_JWT_SECRET,
            expirationInterval: 60 * 60 * 1000, // ms (1 hour)
        },
    },
};
