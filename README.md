# Build micro-services in k8s

We will build a team management system with 5 basic modules:
- Auth
- Member
- Post
- Notification
- Task

### Guide
1. Build service images
```bash
docker build -t <image-name>:<image-ver> --build-arg SERVICE=<service-name> .

# Example
docker build -t auth:v1 --build-arg SERVICE=auth .
docker build -t member:v1 --build-arg SERVICE=member .
docker build -t task:v1 --build-arg SERVICE=task .
docker build -t report:v1 --build-arg SERVICE=report .
docker build -t notification:v1 --build-arg SERVICE=notification .
```

2. Tag and Push image to docker hub
```bash
docker tag auth:v1 <your-docker-hub-user>/<image-name>:<version>

# Example
docker tag auth:v1 duynguyen21vnlp/ms-auth:v1
docker tag report:v1 duynguyen21vnlp/ms-report:v1
docker tag task:v1 duynguyen21vnlp/ms-task:v1
docker tag member:v1 duynguyen21vnlp/ms-member:v1
docker tag notification:v1 duynguyen21vnlp/ms-notification:v1

docker push <your-docker-hub-user>/<image-name>:<version>

# Example
docker push duynguyen21vnlp/ms-auth:v1
docker push duynguyen21vnlp/ms-task:v1
docker push duynguyen21vnlp/ms-report:v1
docker push duynguyen21vnlp/ms-member:v1
docker push duynguyen21vnlp/ms-notification:v1
```

3. Create secret for docker hub
```bash
kubectl create secret generic regcred \
    --from-file=.dockerconfigjson=<path/to/.docker/config.json> \
    --type=kubernetes.io/dockerconfigjson
```

4. Run service in k8s
- Each service will run in a deployment: `deployment.yml`
```bash
kubectl apply -f k8s/<service-name>/deployment.yml

# Example
kubectl apply -f k8s/auth/deployment.yml
kubectl apply -f k8s/member/deployment.yml
kubectl apply -f k8s/notification/deployment.yml
kubectl apply -f k8s/report/deployment.yml
kubectl apply -f k8s/task/deployment.yml
```

- Run service in k8s to connect pod
```bash
kubectl apply -f k8s/<service-name>/service.yml

# Example
kubectl apply -f k8s/auth/service.yml
kubectl apply -f k8s/member/service.yml
kubectl apply -f k8s/notification/service.yml
kubectl apply -f k8s/report/service.yml
kubectl apply -f k8s/task/service.yml
```

Now you can test everything work by run `port-forward`:
```bash
kubectl port-forward service/auth 3000:80

curl localhost:3000/ping
# pong
```

5. Access auth service
- When you finish all command above, you can test access to `auth service`
```bash
curl localhost:8082/ping
# pong
```

6. Install Kong for Kubernetes
- Install directly from manifest
```bash
kubectl create -f https://bit.ly/k4k8s
```

- Create ingress for all services:
```bash
kubectl apply -f k8s/<service-name>/ingress.yml

# Example
kubectl apply -f k8s/auth/ingress.yml
kubectl apply -f k8s/member/ingress.yml
kubectl apply -f k8s/notification/ingress.yml
kubectl apply -f k8s/report/ingress.yml
kubectl apply -f k8s/task/ingress.yml
```

- After finish above command
```bash
# Port forwarding to kong proxy
kubectl -n kong port-forward service/kong-proxy 3000:80

# Check service available
curl localhost:3000/auth/ping
curl localhost:3000/notification/ping
curl localhost:3000/member/ping
curl localhost:3000/task/ping
curl localhost:3000/report/ping
```

