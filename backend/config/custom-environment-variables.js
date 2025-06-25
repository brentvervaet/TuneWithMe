module.exports = {
    env: "NODE_ENV",
    database: {
        host: "DATABASE_HOST",
        port: "PORT",
        name: "DATABASE_NAME",
        username: "DATABASE_USERNAME",
        password: "DATABASE_PASSWORD",
    },
    spotify: {
        clientId: "SPOTIFY_CLIENT_ID",
        clientSecret: "SPOTIFY_CLIENT_SECRET",
    },
    auth: {
        jwt: {
            secret: "AUTH_JWT_SECRET",
        },
    },
};
