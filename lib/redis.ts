import { Redis } from "@upstash/redis";

declare global {
  var __movieRedis: Redis | null | undefined;
}

function createRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

export const redis = global.__movieRedis ?? createRedisClient();

if (process.env.NODE_ENV !== "production") {
  global.__movieRedis = redis;
}

export async function getCachedValue<T>(key: string) {
  if (!redis) {
    return null;
  }

  try {
    return await redis.get<T>(key);
  } catch (error) {
    console.error(`Redis get failed for key ${key}`, error);
    return null;
  }
}

export async function setCachedValue<T>(
  key: string,
  value: T,
  ttlSeconds = 60 * 60
) {
  if (!redis) {
    return;
  }

  try {
    await redis.set(key, value, { ex: ttlSeconds });
  } catch (error) {
    console.error(`Redis set failed for key ${key}`, error);
  }
}
