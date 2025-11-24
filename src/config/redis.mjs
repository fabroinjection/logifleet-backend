import { createClient } from 'redis';

let redisClient = null;

async function createRedisClient(url) {
    const client = createClient({ url });

    client.on('connect', () => {
        console.log('✅ Connected to Redis');
    });

    client.on('error', (err) => {
        console.error('❌ Redis Client Error', err);
    });

    await client.connect();

    return client;
}

export async function getRedisClient(url) {
    try {
        if (!url) {
            throw new Error(
                'REDIS_URL no está definido. Proporcione la URL al llamar getRedisClient.'
            );
        }

        if (redisClient?.isOpen) {
            return redisClient;
        }

        redisClient = await createRedisClient(url);

        return redisClient;
    } catch (err) {
        console.error('❌ Error conectando a Redis:', err);
        process.exit(1);
    }
}

export async function connectToRedis(url) {
    return getRedisClient(url);
}
