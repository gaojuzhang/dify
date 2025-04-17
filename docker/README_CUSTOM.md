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

参考 docker/docker-compose.backup.yaml

```yaml
# 自定义增加
x-shared-env: &shared-api-worker-env
  HOST_UID: ${HOST_UID:-}    # 新增：宿主机 UID
  HOST_GID: ${HOST_GID:-}    # 新增：宿主机 GID

# 在容器db、redis、pgvector三个容器中增加
    user: "${HOST_UID}:${HOST_GID}"  # 使用共享环境中的 UID/GID


  # The postgres database.
  db:
    image: postgres:15-alpine
    user: "${HOST_UID}:${HOST_GID}"  # 自定义 使用共享环境中的 UID/GID
    restart: always
    environment:
      PGUSER: ${PGUSER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-difyai123456}
      POSTGRES_DB: ${POSTGRES_DB:-dify}
      PGDATA: ${PGDATA:-/var/lib/postgresql/data/pgdata}
      TZ: ${TZ:-UTC}          # 自定义 时区
      PGTZ: ${TZ:-UTC}        # 自定义 时区
      # 自定义 timezone -c 'timezone=${TZ:-UTC}'
    command: >
      postgres -c 'max_connections=${POSTGRES_MAX_CONNECTIONS:-100}'
               -c 'shared_buffers=${POSTGRES_SHARED_BUFFERS:-128MB}'
               -c 'work_mem=${POSTGRES_WORK_MEM:-4MB}'
               -c 'maintenance_work_mem=${POSTGRES_MAINTENANCE_WORK_MEM:-64MB}'
               -c 'effective_cache_size=${POSTGRES_EFFECTIVE_CACHE_SIZE:-4096MB}'
               -c 'timezone=${TZ:-UTC}'
    volumes:
      - ./volumes/db/data:/var/lib/postgresql/data
    healthcheck:
      test: [ 'CMD', 'pg_isready' ]
      interval: 1s
      timeout: 3s
      retries: 30

  # The redis cache.
  redis:
    image: redis:6-alpine
    user: "${HOST_UID}:${HOST_GID}"  # 自定义 使用共享环境中的 UID/GID
    restart: always
    environment:
      REDISCLI_AUTH: ${REDIS_PASSWORD:-difyai123456}
    volumes:
      # Mount the redis data directory to the container.
      - ./volumes/redis/data:/data
    # Set the redis password when startup redis server.
    command: redis-server --requirepass ${REDIS_PASSWORD:-difyai123456}
    healthcheck:
      test: [ 'CMD', 'redis-cli', 'ping' ]

  # The pgvector vector database.
  pgvector:
    image: pgvector/pgvector:pg16
    user: "${HOST_UID}:${HOST_GID}"  # 自定义 使用共享环境中的 UID/GID
    profiles:
      - pgvector
    restart: always
    environment:
      PGUSER: ${PGVECTOR_PGUSER:-postgres}
      # The password for the default postgres user.
      POSTGRES_PASSWORD: ${PGVECTOR_POSTGRES_PASSWORD:-difyai123456}
      # The name of the default postgres database.
      POSTGRES_DB: ${PGVECTOR_POSTGRES_DB:-dify}
      # postgres data directory
      PGDATA: ${PGVECTOR_PGDATA:-/var/lib/postgresql/data/pgdata}
      # pg_bigm module for full text search
      PG_BIGM: ${PGVECTOR_PG_BIGM:-false}
      PG_BIGM_VERSION: ${PGVECTOR_PG_BIGM_VERSION:-1.2-20240606}
      TZ: ${TZ:-UTC}          # 自定义 时区
      PGTZ: ${TZ:-UTC}        # 自定义 时区
    volumes:
      - ./volumes/pgvector/data:/var/lib/postgresql/data
      - ./pgvector/docker-entrypoint.sh:/docker-entrypoint.sh
    entrypoint: [ '/docker-entrypoint.sh' ]
    healthcheck:
      test: [ 'CMD', 'pg_isready' ]
      interval: 1s
      timeout: 3s
      retries: 30

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