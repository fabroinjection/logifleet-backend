export function rateLimit(maxLimit = 20, ex = 60) {
    return async function (req, res, next) {
        const redis = req.app.locals.redisClient;

        if (redis) {
            const key = `rate:${req.ip}`;
            const count = await redis.incr(key);

            if (count === 1) {
                await redis.expire(key, ex);
            }

            if (count > maxLimit) {
                return res.status(429).json({
                    error: 'Too many requests, try again later.',
                });
            }
        }

        next();
    };
}
