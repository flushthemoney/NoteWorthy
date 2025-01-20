const rateLimit = require("express-rate-limit");

// allows 100 requests per minute
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
});

// Apply the rate limiter to specific routes or the entire app
const rateLimiter = (app) => {
  app.use(limiter);
};

module.exports = rateLimiter;
