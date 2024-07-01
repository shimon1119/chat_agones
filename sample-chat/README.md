# sample-chat

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.10. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

docker:

```bash
docker build --pull -t sample-chat .
docker run -p 3000:3000 sample-chat
```

kind load docker-image sample-chat:latest
