module.exports = {
    port: 9000,
    logging: {
        level: "silly",
        disabled: false,
    },
    cors: {
        origins: ["http://localhost:5173"],
        maxAge: 3 * 60 * 60,
    },
    database: {
        client: "mysql2",
        host: "localhost",
        port: 3306,
        name: "tuner",
        username: "root",
        password: "",
    },
    auth: {
        maxDelay: 5000,
        argon: {
            saltLength: 16,
            hashLength: 32,
            timeCost: 6,
            memoryCost: 2 ** 17,
        },
        jwt: {
            issuer: "tuner.hogent.be",
            audience: "tuner.hogent.be",
        },
    },
};
