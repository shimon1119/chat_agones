FROM golang:1.22.3-alpine
WORKDIR /app
ADD . .
RUN go build .
EXPOSE 1323
CMD ["go", "run", "server.go"]