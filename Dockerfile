FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci


FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate && npm run build


FROM node:22-alpine AS migrate
WORKDIR /app
COPY package-lock.json ./
RUN npm install --no-save --no-package-lock --no-audit --no-fund \
      "prisma@$(node -p "require('./package-lock.json').packages['node_modules/prisma'].version")" \
      "dotenv@$(node -p "require('./package-lock.json').packages['node_modules/dotenv'].version")" \
    && rm package-lock.json && npm cache clean --force
COPY prisma.config.ts ./
COPY prisma ./prisma
CMD ["npx", "prisma", "migrate", "deploy"]


FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production HOSTNAME=0.0.0.0 PORT=3000

RUN addgroup -g 1001 -S nextjs && adduser -S -u 1001 -G nextjs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static

RUN mkdir -p ./public/img/img-tuto && chown nextjs:nextjs ./public/img/img-tuto

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
