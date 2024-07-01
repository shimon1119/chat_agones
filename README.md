# chat_agones

Agones 用 GameServer

- sample-chat main chat container
- sdk-client sidecar rest api

## start

install agones:

```bash
helm install agones-chat --namespace agones-system --create-namespace agones/agones
```

apply GameServer:

```bash
kubectl apply -f k8s/gameserver.yaml
```

when use kind image push:

```bash
kind load docker-image sample-chat:latest

kind load docker-image sdk-client:latest
```

expose and port forward:

```bash
kubectl expose pod sample-chat --type=NodePort --port=3000
kubectl port-forward --address localhost svc/sample-chat 3000:3000

open http://localhost:3000
```
