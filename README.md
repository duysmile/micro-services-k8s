# Build micro-services in k8s

Guide: https://maple-bass-e96.notion.site/Lab-k8s-a010e868b50f45afacf2bc4200f0a1c4

We will build a team management system with 5 basic modules:
- Auth
- Member
- Post
- Notification
- Task

### Guide

#### 1. Build service images
```bash
docker build -t <image-name>:<image-ver> --build-arg SERVICE=<service-name> .

# Example
docker build -t auth:v1 --build-arg SERVICE=auth .
docker build -t member:v1 --build-arg SERVICE=member .
docker build -t task:v1 --build-arg SERVICE=task .
docker build -t report:v1 --build-arg SERVICE=report .
docker build -t notification:v1 --build-arg SERVICE=notification .
```

#### 2. Tag and Push image to docker hub
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

#### 3. Create secret for docker hub
```bash
kubectl create secret generic regcred \
    --from-file=.dockerconfigjson=<path/to/.docker/config.json> \
    --type=kubernetes.io/dockerconfigjson
```

#### 4. Run service in k8s
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

#### 5. Access auth service
- When you finish all command above, you can test access to `auth service`
```bash
curl localhost:8082/ping
# pong
```

#### 6. Setup Kong for Kubernetes

- Install Kong:
```bash
kubectl apply -f kong/namespace.yml
kubectl apply -f kong/pv_claim.yml
kubectl apply -f kong/deployment.yml
kubectl apply -f kong/service.yml
kubectl apply -f kong/migration.yml
kubectl apply -f kong/custom.yml
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

 - Install Konga:
```bash
kubectl apply -f konga/migration.yml
kubectl apply -f konga/deployment.yml
kubectl apply -f konga/service.yml
```

- Port forward konga:
```bash
kubectl port-forward -n kong service/konga-svc 1337:1337
```

- Setting in Konga admin:
    - Admin URL: `http://kong-proxy:8000`

- Setting JWT v?? Auth service:
    - https://medium.com/velacorpblog/tri%E1%BB%83n-khai-api-gateway-cho-microservice-v%E1%BB%9Bi-kong-2a746939be13
    - https://medium.com/@tselentispanagis/managing-microservices-and-apis-with-kong-and-konga-7d14568bb59d
    - https://viblo.asia/p/trien-khai-api-gateway-len-kubernetes-voi-kong-api-gateway-konga-va-postgresql-Do754z44ZM6

- Flow s??? d???ng JWT plugin

![Flow](https://2tjosk2rxzc21medji3nfn1g-wpengine.netdna-ssl.com/wp-content/uploads/2020/07/FY21_Q1_Degui_Xu.jpg.webp)

- C?? th??? custom Auth Service v???i Kong: https://konghq.com/blog/custom-authentication-and-authorization-framework-with-kong/
- Nh??ng c?? v???n ????? l?? ph???i vi???t b???ng Lua :(, m???c d?? c?? code s???n cho plugin nh??ng c??ng s??? kh?? custom n???u kh??ng bi???t Lua.


- M???t v??i c??u h???i v???i API Gateway:
1. C?? th??? v?? c?? n??n t??? setup API Gateway kh??ng?
2. N???u d??ng Kong th?? khi c?? identifier m???i th?? ?????u ph???i l??u tr??? ??? db c???a Kong, ho???c ph???i thi???t k??? DB theo format c???a Kong, c?? ????ng kh??ng?
3. C?? th??? custom service register theo business kh??ng, v?? c?? d??? d??ng kh??ng?





