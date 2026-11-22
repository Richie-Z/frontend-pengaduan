# Technical notes: Pengaduan

This repository is the client half of the Indonesian `pengaduan` system. It holds no
database, no migrations, and no server-side models. It renders Vue components on a Node
server and forwards every read and write to the companion `Solo/api-pengaduan` service
through an `/api/*` proxy.

## Stack

Exact versions below come from `yarn.lock`, not `package.json`. The manifest constraints
(`^2.15.8`, `^2.6.14`, `^5.13.6`) state minimums and are satisfied by the locked versions.

- Nuxt 2.15.8 (`yarn.lock:5413-5414`; constraint at `package.json:20`).
- Vue 2.6.14 (`yarn.lock:8131-8132`; `package.json:24`).
- @nuxtjs/axios 5.13.6 in proxy mode with prefix `/api/` (`yarn.lock:1328-1329`,
  `nuxt.config.js:39,44-48`).
- webpack 4.46.0, Tailwind CSS 3.x, vue-good-table 2.x, SweetAlert2 11.x, @nuxtjs/pwa
  3.3.5, vue-js-modal 2.x (`package.json:12-29`).
- Runtime: Node 16 from `node:16-alpine` in all three Docker stages (`Dockerfile:1,9,14`).
  The exact patch or digest behind the floating tag is UNKNOWN — requires human input.
- Package manager: yarn via Corepack with `--frozen-lockfile` (`Dockerfile:4,12`).
- Build: `yarn build` runs `nuxt build` (`package.json:7`); output is `.nuxt/` plus
  `static/`, not `dist/` or `.output/` (`Dockerfile:18-19`).
- Start: `nuxt start` wrapped in `sh -c` (`package.json:8`, `Dockerfile:23`).

`package.json` declares no `engines.node`; Node 16 is enforced only by the Dockerfile.
Nuxt 2 ships webpack 4, whose MD4 hashing breaks on Node 17 and above under OpenSSL 3
unless `--openssl-legacy-provider` is passed, while Node 16 rejects that flag.
`CONTAINERIZE.md:24` mentions the flag but `Dockerfile:23` passes none; the Dockerfile is
authoritative here.

## Architecture

The entry point is Nuxt's built-in Node SSR server started by `npx nuxt start`
(`Dockerfile:23`). It binds `host: "0.0.0.0"` and `port: process.env.PORT || 8000`
(`nuxt.config.js:72-75`); the container sets `PORT=8080` and exposes 8080
(`Dockerfile:16,22`). There is no nginx, no PHP-FPM and no process manager. Nuxt serves the
client bundles from `.nuxt/` and the contents of `static/` itself.

SSR is enabled. There is no `ssr: false` in the full config (`nuxt.config.js:1-81`), and the
build uses `nuxt start` rather than `nuxt generate`. The inventory flag `uses_ssr: false`
(`inventory.json:1443`) is inaccurate; the `nuxt-ssr` archetype and the Dockerfile agree
with the source.

Routing is file-based: each `pages/**/*.vue` file is a GET route, with no explicit router
file, giving 14 page routes. Rendering is Nuxt/Vue 2 component rendering on the server,
with the same components hydrating in the browser. There is no separate view engine.

Data flow goes through axios with the `/api/` prefix (`nuxt.config.js:47`). The proxy
rewrites `^/api/` to an empty string and targets `process.env.API_URL`
(`nuxt.config.js:46-54`), so a component call to `pengaduan` becomes `/api/pengaduan` in the
browser and `<API_URL>/pengaduan` upstream. Mutations are axios calls, not Nuxt routes:
`POST pengaduan`, `PUT`/`DELETE pengaduan/:id`, `POST auth/login`, `GET csrf-token`,
`GET auth/me`, `DELETE auth/logout`, and the `petugas/*` and admin CRUD calls listed in the
report's route inventory.

Some hooks block the server render: the homepage `asyncData` calls `$get("myip")` and its
`fetch` calls `$get("pengaduan")` (`pages/index.vue:60-67`), and the admin dashboard
`asyncData` does the same (`pages/admin/index.vue:80-83`). Client state lives in three
Vuex stores: `store/pengaduans.js`, `store/petugas.js`, and `store/index.js`.

There is no background work: no queue or scheduler (inventory `queue_scheduler: false`,
`inventory.json:1445`), no mail, and no cache configured.

## Data model

There is no local database, ORM, migration, or SQL dump in this repository. The shapes
below are inferred from how JSON is consumed in views; the authoritative schema is behind
the separate API service and out of scope.

- `pengaduan` — `id`, `laporan`, `isiLaporan`, `createdAt`, `detail.nama`,
  `detail.masyarakatIp`, `detail.status`, and `lampiran` as a JSON string of
  `{filename, location}` (`pages/index.vue:26-29`, `components/blocks/PengaduanCard.vue:10-17`,
  `pages/admin/pengaduan/_id.vue:239-269`). `detail.status` is one of `belumVerif`,
  `proses`, `selesai` (`pages/admin/pengaduan/index.vue:20-22`). It has many `tanggapan`.
- `tanggapan` — `id`, `tanggapan`, `detailPerubahan`, `lampiran` (JSON), and
  `penanggap.name` (`pages/admin/pengaduan/_id.vue:260-268`,
  `pages/pengaduan/_id.vue:166-173`). It belongs to a `pengaduan` and is written by petugas.
- `petugas` / admin user — `name`, `username`, and `role`, where `"admin"` is the gate
  (`pages/admin/users/index.vue:65-75`, `middleware/admin-only.js:2-3`). It has many
  `tanggapan` as `penanggap`.
- `masyarakat` / member — `nama`, defaulting to `"Anonymous"`, and `masyarakatIp`
  (`pages/admin/members/index.vue:43-52`, `pages/admin/members/detail.vue:109-114`). It has
  many `pengaduan`, filtered by `?memberIP=`.
- Dashboard counters — `pengaduan`, `members`, and `petugas` counts fetched by the admin
  dashboard (`pages/admin/index.vue:14-68,80-82`).
- In-memory Vuex only — `pengaduans.data` populated by `dispatch("pengaduans/storePengaduan")`
  from `fetch` (`store/pengaduans.js:1-16`, `pages/index.vue:65-66`); `petugas` populated
  from `auth/me` and `auth/login` (`store/petugas.js:1-16`); an `authenticated` flag declared
  at `store/index.js:1-8` that no middleware actually reads, because guards inspect
  `petugas` instead.

Gap worth calling out: every persisted entity above (`pengaduan`, `tanggapan`, `petugas`,
`masyarakat`, dashboard aggregates) is queried with no migration, dump, or fixture in this
repo. The schema lives entirely behind `API_URL` (`nuxt.config.js:51`). No table here is
created by hand-written SQL or reconstructed from a local query log — there is no SQL at
all in the source.

## Auth

Authentication is an API-issued session cookie plus a CSRF token, driven from the frontend
through `GET auth/me`, `POST auth/login`, `DELETE auth/logout`, and `GET csrf-token`
(`pages/admin/login.vue:29,44,53`, `components/admin/Header.vue:122`). There is no JWT,
Sanctum, Passport, or API key in the source. `login()` posts `auth/login`, stores the
response, and routes to `admin` (`pages/admin/login.vue:43-50`); the CSRF bootstrap is at
`pages/admin/login.vue:52-54`. A "Change Password" modal PUTs `auth/change_password`
(`components/admin/PasswordModal.vue:5,57-60`).

Guards are per-layout and per-page, not global: `nuxt.config.js:1-81` declares no
`router.middleware`. All admin pages sit under the layout middleware `authenticated`
(`layouts/admin/default.vue:23`), whose implementation calls `auth/me` and redirects to
`admin-login` when unauthenticated (`middleware/authenticated.js:1-7`). Staff/user pages
add `admin-only`, which redirects unless `petugas.role === "admin"`
(`middleware/admin-only.js:1-4`, applied at `pages/admin/users/index.vue:62`, `add.vue:58`,
`_id.vue:103`, `edit/_id.vue:46`). The login page redirects to `/admin` if already logged
in (`pages/admin/login.vue:27-35`).

Reachable without auth: `/`, `/pengaduan/add`, `/pengaduan/:id`, `/admin/login`, and the
`/pengaduan` redirect stub. Session identity is held only in in-memory Vuex
(`store/petugas.js:2`), so a full reload depends on `auth/me` re-fetching it from the API
(`middleware/authenticated.js:2`). Registration and password reset flows do not exist in
this frontend.

## External services

The only integrated service is the companion API: @nuxtjs/axios proxies to
`process.env.API_URL` with prefix `/api/` (`nuxt.config.js:39,44-54`). Attachment files are
posted to it as multipart `FormData` under `lampiran`; there is no local upload directory
(`pages/pengaduan/add.vue:74-80`, `pages/admin/pengaduan/_id.vue:316-326`).

Environment variable names visible in source: `API_URL` (`nuxt.config.js:51`), `PORT`
(`nuxt.config.js:73`), `HOST` and `NODE_ENV` (`Dockerfile:16`). There is no `.env.example`
and no `config/` directory in this repo, and no values are recorded. Actual runtime values
and any further env consumed by the upstream API are UNKNOWN — requires human input.

Configured as absent: local database, cache, session store on this side, queue/scheduler,
mail, and third-party HTTP APIs. Font Awesome, SweetAlert2, vue-good-table, and
@nuxtjs/pwa are npm libraries, not network services (`package.json:12-29`).

## Operational risks

- `API_URL` is required at runtime: the proxy targets it (`nuxt.config.js:49-54`), and no
  local fallback data exists. Unset or unreachable means every data call fails.
- SSR-blocking external calls: homepage and admin-dashboard hooks await the API during
  render (`pages/index.vue:60-67`, `pages/admin/index.vue:80-83`). The axios error handler
  dereferences `err.response.status` (`plugins/axios.js:4-9`), so a connection-level failure
  with no `response` object throws a `TypeError` instead of a message and can turn SSR into
  a 500. Any axios error also raises a modal SweetAlert that can obscure the page.
- Every admin SSR request re-runs `auth/me` (`middleware/authenticated.js:2`,
  `layouts/admin/default.vue:23`); API slowness stalls all admin pages.
- `nuxt start` needs production `node_modules`, `.nuxt/`, and `nuxt.config.js` copied from
  the build and deps stages (`Dockerfile:17-20`); it fails without them.
- Node 16 is a floating tag (`Dockerfile:1,9,14`). Moving to Node 17+ without the legacy
  OpenSSL provider breaks webpack 4, while Node 16 rejects that flag. There is no
  `engines.node` guard.
- No local writable paths are required and there are no boot-time database queries or
  build-time env bakes; attachments are streamed to the API. `nuxt.config.js` only reads
  env vars at config load (`nuxt.config.js:51,73`).
- The Jenkins CI agent label `node` is unverified on this cluster (`CONTAINERIZE.md:26`).
- Above one replica, this image holds no shared state: Vuex is per-SSR-request or
  per-browser, with no local session, cache, or upload files. Scaling is limited by the
  external API and by its cookie domain being reachable, not by this frontend.

## Container layout

The image is a multi-stage `docker.io/library/node:16-alpine` build: `build` installs and
runs `yarn build` (`Dockerfile:1-7`), `deps` installs production-only packages
(`Dockerfile:9-12`), and `runtime` copies production `node_modules`, `.nuxt/`, `static/`,
`package.json`, and `nuxt.config.js` (`Dockerfile:14-20`) before dropping to `USER node`
(`Dockerfile:21`). It serves through Nuxt's own SSR server on `0.0.0.0:8080`
(`Dockerfile:22-23`) with no nginx or PHP-FPM; Nuxt also serves the static assets.

Repo-local fixes that must not be lost are the Node 16 pin in place of the Node 24 default
(`CONTAINERIZE.md:24`) and the `sh -c` wrapper around `nuxt start` (`Dockerfile:23`,
`CONTAINERIZE.md:25`). Do not add `--openssl-legacy-provider` on Node 16 just because
`CONTAINERIZE.md:24` mentions it; the generated Dockerfile is authoritative.

This is not one of the six never-re-render repos: regeneration is safe here. Database
smoke is skipped. The "legacy mysqli app" note in the smoke lines (`CONTAINERIZE.md:28-29`)
is stale copy-paste noise and does not describe this repository — there is no PHP or MySQL
in the source.
