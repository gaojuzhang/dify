## 不使用docker desktop之后需要修改的内容
- .gitignore

```ini
# custom
.cursorrules
volumes/
docker/volumes
docker/volumes-*
docker/README_CUSTOM.md
```

- docker-compose.yaml

参考 docker/docker-compose.override.yaml

```yaml
# 自定义增加
x-shared-env: &shared-api-worker-env
  HOST_UID: ${HOST_UID:-}    # 新增：宿主机 UID
  HOST_GID: ${HOST_GID:-}    # 新增：宿主机 GID

# 在容器db、redis、pgvector三个容器中增加

    user: "${HOST_UID}:${HOST_GID}"  # 使用共享环境中的 UID/GID

```

- .env
HOST_UID=$(id -u)  # 动态获取 UID（但需注意：.env 文件不支持命令执行）
HOST_GID=$(id -g)  # 需手动填写实际数值（例如 501:20）

```ini
# ------------------------------
# Common Variables
# ------------------------------
HOST_UID=501
HOST_GID=20

# mod 1
< LOG_TZ=Asia/Shanghai
< # System Timezone
< TZ=Asia/Shanghai
---
> LOG_TZ=UTC

# mod 2
< VECTOR_STORE=pgvector
---
> VECTOR_STORE=weaviate

```