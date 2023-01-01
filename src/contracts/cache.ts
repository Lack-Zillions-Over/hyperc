import { createHash } from 'crypto';
import { compressToBase64, decompressFromBase64 } from 'lz-string';
import Redis from "ioredis";

abstract class CacheContract {
  protected client: Redis;

  constructor() {
    this.client = new Redis(process.env.REDIS_URL, {
      password: process.env.REDIS_PASSWORD,
    });
  }

  protected serializeIdentifier(identifier: string | number) {
    return createHash('sha256').update(identifier.toString()).digest('hex');
  };

  protected compress<T>(value: T): string {
    return compressToBase64(JSON.stringify(value));
  }

  protected decompress<T>(value: string): T {
    return JSON.parse(decompressFromBase64(value));
  }

  public abstract create(identifier: string | number, ttl: number): Promise<boolean>;
  public abstract set<T>(identifier: string | number, key: string, value: T): Promise<boolean>;
  public abstract get<T>(identifier: string | number, key: string): Promise<T>;
  public abstract del(identifier: string | number, key: string): Promise<boolean>;
  public abstract flush(identifier: string | number): Promise<boolean>;
  public abstract flushAll(): Promise<boolean>;
}

export default CacheContract;
