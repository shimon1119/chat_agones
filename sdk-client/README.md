# sdk-client sidecar

build:

```bash
go install
```

run:

```bash
go run server.go
```

docker:

```bash
docker build -t sdk-client .

docker run -p 1323:1323 sdk-client
```

kind load:

kind load docker-image sdk-client:latest
