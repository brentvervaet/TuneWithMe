module.exports = {
  cors: {
    origins: ["https://tunewithme.onrender.com"],
  },
  auth: {
    jwt: {
      expirationInterval: 7 * 24 * 60 * 60 * 1000, // ms (1 hour)
    },
  },
};
