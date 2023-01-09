import { Cache } from "../controllers/index";

const mockData: Record<string, string> = {};

jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => {
    return {
      set: jest.fn((key: string, value: string) => {
        return mockData[key] = value;
      }),
      get: jest.fn((key: string) => {
        return mockData[key];
      }),
      keys: jest.fn((pattern: string) => {
        return Object.keys(mockData).filter(key => key.includes(pattern));
      }),
      del: jest.fn((key: string) => {
        delete mockData[key];
        return true;
      }),
      flushall: jest.fn(() => {
        Object.keys(mockData).forEach(key => delete mockData[key]);
        return true;
      }),
    }
  });
});

const setupSut = () => {
  const sut = new Cache();
  return { sut };
};

describe('Cache Suite Tests', () => {
  test('should create new cache', async () => {
    const { sut } = setupSut();
    await expect(sut.create('test1', 1000)).resolves.toBe(true);
    await expect(sut.create('test2', 1000)).resolves.toBe(true);
  });

  test('should set new value', async () => {
    const { sut } = setupSut();
    await expect(sut.set('test1', 'name', 'John Doe')).resolves.toBe(true);
    await expect(sut.set('test2', 'name', 'Jane Doe')).resolves.toBe(true);
  });

  test('should get value', async () => {
    const { sut } = setupSut();
    await expect(sut.get('test1', 'name')).resolves.toBe('John Doe');
  });

  test('should delete value', async () => {
    const { sut } = setupSut();
    await expect(sut.del('test1', 'name')).resolves.toBe(true);
  });

  test('should not get value deleted', async () => {
    const { sut } = setupSut();
    await expect(sut.get('test1', 'name')).resolves.toBe(null);
  });

  test('should flush values', async () => {
    const { sut } = setupSut();
    await expect(sut.flush('test1')).resolves.toBe(true);
  });

  test('should get values other cache after flush', async () => {
    const { sut } = setupSut();
    await expect(sut.get('test2', 'name')).resolves.toBe('Jane Doe');
  });

  test('should flush all values', async () => {
    const { sut } = setupSut();
    await expect(sut.flushAll()).resolves.toBe(true);
  });

  test('should not get values deleted', async () => {
    const { sut } = setupSut();
    await expect(sut.get('test1', 'name')).resolves.toBe(null);
    await expect(sut.get('test2', 'name')).resolves.toBe(null);
  });
});
