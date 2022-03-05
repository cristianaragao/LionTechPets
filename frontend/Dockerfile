FROM node:16.14.0-alpine AS dev

WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,id=yarn,sharing=locked,target=/usr/local/share/.cache/yarn yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16.14.0-alpine AS build
WORKDIR /app
COPY . ./
COPY --from=dev /app/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM node:16.14.0-alpine AS prod
WORKDIR /app

ARG APP_ENV=production
ARG NODE_ENV=production
ARG PORT=3000

ENV APP_ENV=${APP_ENV} \
    NODE_ENV=${NODE_ENV} \
    PORT=${PORT} \
# This allows to access Graphql Playground
    APOLLO_PRODUCTION_INTROSPECTION=false

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN mkdir -p /app/.next/cache/images && chown nextjs:nodejs /app/.next/cache/images
VOLUME /app/.next/cache/images

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=build /app/next.config.js ./
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

USER nextjs

EXPOSE ${PORT}

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]