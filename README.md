# LZO: Hyperc

> Caching in Node.js to optimize app performance

[![Sponsor][sponsor-badge]][sponsor]
[![Commitizen friendly][commitizen-badge]][commitizen]
[![TypeScript version][ts-badge]][typescript-4-9]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][license]
[![Build Status - GitHub Actions][gha-badge]][gha-ci]

## Installation

```bash
npm install lzo-hyperc
```

## Configuration

Please input the credentials of your Redis server in the `.env` file.

> See the example in the `.env.example` file.

```bash
REDIS_URL="redis://IP:PORT"
REDIS_PORT=6379
REDIS_PASSWORD="PASSWORD"
```

## Usage

```typescript
import { Hyperc } from 'lzo-hyperc';

await Hyperc.create('test', 1000); // Create a cache with a 1 second TTL

await Hyperc.set('test', 'name', 'John Doe'); // Set a value in the cache

await Hyperc.get('test', 'name'); // John Doe

setTimeout(() => {
  cache.get('test', 'name').then(console.log); // null (cache expired)
}, 1000);
```

## API

`Hyperc.create(identifier: string | number, ttl: number): Promise<boolean>`

> Create a cache with a TTL.

`Hyperc.set<T>(identifier: string | number, key: string, value: T): Promise<boolean>`

> Set a value in the cache.

`Hyperc.get<T>(identifier: string | number, key: string): Promise<T | null>`

> Get a value from the cache.

`Hyperc.del(identifier: string | number, key: string): Promise<boolean>`

> delete a value in the cache.

`Hyperc.flush(identifier: string | number): Promise<boolean>`

> Flush the cache by identifier.

`Hyperc.flushAll(): Promise<boolean>`

> Flush all caches.

## Backers & Sponsors

Support this project by becoming a [sponsor][sponsor].

## License

Licensed under the MIT. See the [LICENSE](https://github.com/Lack-Zillions-Over/hyperc/blob/main/LICENSE) file for details.

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen]: http://commitizen.github.io/cz-cli/
[ts-badge]: https://img.shields.io/badge/TypeScript-4.9-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2018.12.1-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v18.x/docs/api/
[gha-badge]: https://github.com/Lack-Zillions-Over/hyperc/actions/workflows/nodejs.yml/badge.svg
[gha-ci]: https://github.com/Lack-Zillions-Over/hyperc/actions/workflows/nodejs.yml
[typescript-4-9]: https://devblogs.microsoft.com/typescript/announcing-typescript-4-9/
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/Lack-Zillions-Over/hyperc/blob/main/LICENSE
[sponsor-badge]: https://img.shields.io/badge/♥-Sponsor-fc0fb5.svg
[sponsor]: https://github.com/sponsors/Lack-Zillions-Over
