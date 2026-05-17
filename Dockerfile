FROM node:20-bullseye AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate && npm run build


FROM node:20-bullseye

WORKDIR /app
ENV NODE_ENV=production HOSTNAME=0.0.0.0 PORT=3000

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY docker/entrypoint.sh ./entrypoint.sh

RUN useradd -r -u 1001 nextjs && \
    chmod +x ./entrypoint.sh && \
    mkdir -p ./public/img/img-tuto && \
    chown -R nextjs:nextjs .next public entrypoint.sh package.json

USER nextjs
EXPOSE 3000
ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]
