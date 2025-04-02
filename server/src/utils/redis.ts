import Redis, { Redis as RedisClient } from 'ioredis';

type RedisOptions = {
  host?: string;
  port?: number;
  password: string;
  db?: number;
};

class RedisService {
  private client: RedisClient;

  constructor(options: RedisOptions = {password:'password'}) {
    this.client = new Redis({
      host: options.host || '127.0.0.1',
      port: options.port || 6379,
      password: options.password,
      db: options.db || 0,
    });
    this.client.on('connect', () => console.log('Connected to Redis'));
    this.client.on('error', (err) => console.error('Redis error:', err));
  }

  async set(key: string, value: string, expiryInSeconds?: number): Promise<string | null> {
    try {
      if (expiryInSeconds) {
        return await this.client.setex(key, expiryInSeconds, value);
      }
      return await this.client.set(key, value);
    } catch (error) {
      console.error('Redis SET Error:', error);
      return null;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      console.error('Redis GET Error:', error);
      return null;
    }
  }

  async delete(key: string): Promise<number> {
    try {
      return await this.client.del(key);
    } catch (error) {
      console.error('Redis DELETE Error:', error);
      return 0;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      return (await this.client.exists(key)) === 1;
    } catch (error) {
      console.error('Redis EXISTS Error:', error);
      return false;
    }
  }

  async increment(key: string): Promise<number | null> {
    try {
      return await this.client.incr(key);
    } catch (error) {
      console.error('Redis INCREMENT Error:', error);
      return null;
    }
  }

  async close(): Promise<void> {
    try {
      await this.client.quit();
      console.log('Redis connection closed');
    } catch (error) {
      console.error('Redis CLOSE Error:', error);
    }
  }
}

export default RedisService;
