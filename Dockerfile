FROM docker.io/library/node:16-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile
COPY . .

RUN yarn run build

FROM docker.io/library/node:16-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile --production

FROM docker.io/library/node:16-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=8080
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.nuxt ./.nuxt
COPY --from=build /app/static ./static
COPY package.json nuxt.config.js ./
USER node
EXPOSE 8080
CMD ["sh", "-c", "npx nuxt start"]
HEALTHCHECK --interval=10s --timeout=3s --start-period=30s --retries=3 CMD ["sh", "-c", "wget -q -O /dev/null http://127.0.0.1:${PORT}/ || exit 1"]
