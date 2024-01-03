# express-rate-limiter

Implement rate limiting using the token bucket algorithm for express server and
Queue Worker.

## Requirements

- redis

## Usage

start redis:

```bash
// brew で install した場合
brew services start redis
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.js
```

This project was created using `bun init` in bun v1.0.4. [Bun](https://bun.sh)
is a fast all-in-one JavaScript runtime.
