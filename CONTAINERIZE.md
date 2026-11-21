# CONTAINERIZE - Solo/frontend-pengaduan

Archetype: nuxt-ssr. Generated 2026-11-21T02:27:29+07:00 by .opencode/scripts/render.sh on branch chore/containerize (uncommitted).

## Generated files
- Dockerfile (template: Dockerfile.nuxt2)
- Jenkinsfile (CI only; parameters REGISTRY, HARBOR_PROJECT, HARBOR_CRED_ID)
- .dockerignore

## Local run
```sh
bash .opencode/scripts/build.sh Solo/frontend-pengaduan
bash .opencode/scripts/smoke.sh Solo/frontend-pengaduan
```
Manual run: podman run --rm --network=host --env-file /home/richie/Documents/Programming/Projects/.smoke.env -e PORT=<free-port> containerize/frontend-pengaduan:local

## Required env var NAMES (values never stored here)
unknown - inspect app config (do not print secret values)

## DB smoke
boot + healthcheck only (DB not smoke-tested). db_driver: unknown. Never migrate/seed/modify; DBs are live.

## Flags
- Nuxt 2: Node pinned to 16 + openssl-legacy-provider (deviation from Node 24 default)
- start script is not plain node: wrapped in sh -c (nuxt start)
- agent label 'node' unverified on k3s Jenkins (only bun/buildah proven by BenchCheck) - confirm with user

Smoke results: 2026-11-21T15:15:05+07:00 boot=PASS http=200 db=skipped (legacy mysqli app; pgsql not supported without a code rewrite)
