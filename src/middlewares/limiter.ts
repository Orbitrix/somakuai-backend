import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  }
});